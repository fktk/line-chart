import Plotly from 'plotly.js-gl2d-dist';

export function changeModeHandler() {
  Plotly.update(
    this.chart.MYCHART,
    {'mode': this.chart.mode.value},
    {
      'xaxis.range': [this.chart.xMin.value, this.chart.xMax.value],
      'yaxis.range': [this.chart.yMin.value, this.chart.yMax.value]
    }
  );
}

export function inputXMinHandler() {
  Plotly.relayout(this.chart.MYCHART, {'xaxis.range[0]': this.chart.xMin.value});
}

export function inputXMaxHandler() {
  Plotly.relayout(this.chart.MYCHART, {'xaxis.range[1]': this.chart.xMax.value});
}

export function inputYMinHandler() {
  Plotly.relayout(this.chart.MYCHART, {'yaxis.range[0]': this.chart.yMin.value});
}

export function inputYMaxHandler() {
  Plotly.relayout(this.chart.MYCHART, {'yaxis.range[1]': this.chart.yMax.value});
}

export function changeLegendHandler() {
  Plotly.relayout(this.chart.MYCHART, {'showlegend': this.chart.legend.checked});
}

export function changeLegendDirectionHandler() {
  switch (this.chart.legendDirection.value) {
    case 'horizontal':
      Plotly.relayout(this.chart.MYCHART, {
        'legend.orientation': 'h'
      });
      break;
    case 'vertical':
      Plotly.relayout(this.chart.MYCHART, {
        'legend.orientation': 'v'
      });
      break;
  }
}
