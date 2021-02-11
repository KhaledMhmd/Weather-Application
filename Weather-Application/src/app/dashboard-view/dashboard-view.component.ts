import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as d3 from 'd3';
import { GetWeatherService } from '../get-weather.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css'],
})
export class DashboardViewComponent implements OnInit {
  city: string = '';
  weatherData: any;
  myChart: any;
  canvas: any;
  ctx: any;
  chart: any;
  time: any;
  tempHourly: any;

  private svg: any;
  private margin = 50;

  private width = 500 - this.margin * 2;
  private height = 350 - this.margin * 2;
  constructor(
    private route: ActivatedRoute,
    private getWeatherService: GetWeatherService,
    private router: Router
  ) {}

  ngOnInit() {
    const citySmall = this.route.snapshot.params['city'];
    const inputCity = citySmall.charAt(0).toUpperCase() + citySmall.slice(1);
    this.getWeatherService.onWeatherGet(inputCity).subscribe((data) => {
      if (data.data.error || data.data.request[0].type !== 'City') {
        this.city = '';
        this.router.navigate(['/not-found/' + inputCity]);
      } else {
        this.city = inputCity;

        this.weatherData = data.data.weather.map((x: any) => {
          const container = {
            date: '',
            avgtempC: '',
          };

          const dayFormatted = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
          }).format(Date.parse(x.date));

          container.date = dayFormatted;
          container.avgtempC = x.avgtempC;

          return container;
        });

        this.createSvg();
        this.drawBars(this.weatherData);

        this.time = data.data.weather[0].hourly.map((x: any) => x.time);
        this.tempHourly = data.data.weather[0].hourly.map((x: any) => x.tempC);
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');

        this.myChart = new Chart(this.ctx, {
          type: 'line',
          data: {
            labels: [
              '00:00',
              '03:00',
              '06:00',
              '09:00',
              '12:00',
              '15:00',
              '18:00',
              '21:00',
            ],
            datasets: [
              {
                data: this.tempHourly,
                borderColor: '#3cba9f',
                fill: true,
                label: 'three-hour interval temperature',
              },
            ],
          },
          options: {
            responsive: true,
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Three-Hour Interval Temperature',
              fontColor: '#ffffff',
              fontSize: 16,
              fontStyle: 'normal',
              fontFamily: 'sans-serif',
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: '#ffffff',
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Time(hr)',
                    fontColor: '#ffffff',
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    fontColor: '#ffffff',
                    beginAtZero: true,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Temp(°C)',
                    fontColor: '#ffffff',
                  },
                },
              ],
            },
          },
        });
      }
    });
  }

  private createSvg(): void {
    this.svg = d3
      .select('figure#bar')
      .append('svg')
      .attr('viewBox', `0 0 530 530`)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');

    this.svg
      .append('text')
      .attr('x', this.width / 2)
      .attr('y', 0 - this.margin / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('fill', '#ffffff')
      .text('Weekly Average Temperature');
  }

  private drawBars(data: any[]): void {
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d) => d.date))
      .padding(0.2);

    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    const y = d3
      .scaleLinear()
      .domain([
        -3 + +d3.min(data, (d) => d.avgtempC),
        1 + +d3.max(data, (d) => d.avgtempC),
      ])
      .nice()
      .range([this.height, 0]);

    this.svg.append('g').call(d3.axisLeft(y));

    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: { date: string }) => x(d.date))
      .attr('y', (d: { avgtempC: d3.NumberValue }) => y(d.avgtempC))
      .attr('width', x.bandwidth())
      .attr(
        'height',
        (d: { avgtempC: d3.NumberValue }) => this.height - y(d.avgtempC)
      )
      .attr('fill', '#3cba9f');
  }
}
