//
// const data = {
//   "male": {
//     "values": [{
//       "date": 1404172800,
//       "age_groups": []
//     }]
//   },
//   "female": {
//     "values": [{
//       "date": 1404172800,
//       "age_groups": []
//     }]
//   }
// };
//
// for(let i = 0; i < 6; i++) {
//   data.male.values[0]['age_groups'][i] = {
//     "age": '' + (40 + i * 10),
//     "actual_value": 1 + Math.floor(Math.random() * 300)
//   };
//   data.female.values[0]['age_groups'][i] = {
//     "age": '' + (40 + i * 10),
//     "actual_value": 1 + Math.floor(Math.random() * 300)
//   };
// }
//
// let maleTotal = 0;
// let femaleTotal = 0;
//
// for(let i = 0; i < 6; i++) {
//   let maleMax = 0;
//   const maleItem = data.male.values[0]['age_groups'][i];
//   if(maleMax < maleItem['actual_value']) {
//     maleMax = maleItem['actual_value'];
//   }
//   data.male.values[0]['max_actual_value'] = maleMax;
//   maleTotal += maleItem['actual_value'];
//
//   let femaleMax = 0;
//   const femaleItem = data.female.values[0]['age_groups'][i];
//   if(femaleMax < femaleItem['actual_value']) {
//     femaleMax = femaleItem['actual_value'];
//   }
//   data.female.values[0]['max_actual_value'] = femaleMax;
//   femaleTotal += maleItem['actual_value'];
// }
//
//
// for(let i = 0; i < 6; i++) {
//   const maleItem = data.male.values[0]['age_groups'][i];
//   const femaleItem = data.female.values[0]['age_groups'][i];
//   maleItem['gender_percentage'] =  maleItem['actual_value'] / maleTotal;
//   maleItem['total_percentage'] =  maleItem['actual_value'] / (maleTotal + femaleTotal);
//   femaleItem['gender_percentage'] =  femaleItem['actual_value'] / femaleTotal;
//   femaleItem['total_percentage'] =  femaleItem['actual_value'] / (maleTotal + femaleTotal);
// }

const data = {
  "male": {
    "values": [{
      "date": 1404172800,
      "age_groups": [{
        "age": "40",
        "actual_value": 253,
        "gender_percentage": 0.2344763670064875,
        "total_percentage": 0.11723818350324375
      }, {
        "age": "50",
        "actual_value": 211,
        "gender_percentage": 0.19555143651529194,
        "total_percentage": 0.09777571825764597
      }, {
        "age": "60",
        "actual_value": 54,
        "gender_percentage": 0.05004633920296571,
        "total_percentage": 0.025023169601482854
      }, {
        "age": "70",
        "actual_value": 230,
        "gender_percentage": 0.21316033364226136,
        "total_percentage": 0.10658016682113068
      }, {
        "age": "80",
        "actual_value": 115,
        "gender_percentage": 0.10658016682113068,
        "total_percentage": 0.05329008341056534
      }, {
        "age": "90",
        "actual_value": 216,
        "gender_percentage": 0.20018535681186284,
        "total_percentage": 0.10009267840593142
      }],
      "max_actual_value": 216
    }]
  },
  "female": {
    "values": [{
      "date": 1404172800,
      "age_groups": [{
        "age": "40",
        "actual_value": 272,
        "gender_percentage": 0.2520852641334569,
        "total_percentage": 0.12604263206672844
      }, {
        "age": "50",
        "actual_value": 22,
        "gender_percentage": 0.020389249304911955,
        "total_percentage": 0.010194624652455977
      }, {
        "age": "60",
        "actual_value": 186,
        "gender_percentage": 0.17238183503243745,
        "total_percentage": 0.08619091751621873
      }, {
        "age": "70",
        "actual_value": 238,
        "gender_percentage": 0.2205746061167748,
        "total_percentage": 0.1102873030583874
      }, {
        "age": "80",
        "actual_value": 278,
        "gender_percentage": 0.25764596848934196,
        "total_percentage": 0.12882298424467098
      }, {
        "age": "90",
        "actual_value": 64,
        "gender_percentage": 0.05931417979610751,
        "total_percentage": 0.029657089898053754
      }],
      "max_actual_value": 64
    }]
  }
}



console.log(data);


const { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet } = window.BizCharts;


const data = {
  "male": {
    "values": [{
      "age": "40",
      "actual_value": 253,
      "gender_percentage": 0.2344763670064875,
      "total_percentage": 0.11723818350324375
    }, {
      "age": "50",
      "actual_value": 211,
      "gender_percentage": 0.19555143651529194,
      "total_percentage": 0.09777571825764597
    }, {
      "age": "60",
      "actual_value": 54,
      "gender_percentage": 0.05004633920296571,
      "total_percentage": 0.025023169601482854
    }, {
      "age": "70",
      "actual_value": 230,
      "gender_percentage": 0.21316033364226136,
      "total_percentage": 0.10658016682113068
    }, {
      "age": "80",
      "actual_value": 115,
      "gender_percentage": 0.10658016682113068,
      "total_percentage": 0.05329008341056534
    }, {
      "age": "90",
      "actual_value": 216,
      "gender_percentage": 0.20018535681186284,
      "total_percentage": 0.10009267840593142
    }]
  },
  "female": {
    "values": [{
      "age": "40",
      "actual_value": 272,
      "gender_percentage": 0.2520852641334569,
      "total_percentage": 0.12604263206672844
    }, {
      "age": "50",
      "actual_value": 22,
      "gender_percentage": 0.020389249304911955,
      "total_percentage": 0.010194624652455977
    }, {
      "age": "60",
      "actual_value": 186,
      "gender_percentage": 0.17238183503243745,
      "total_percentage": 0.08619091751621873
    }, {
      "age": "70",
      "actual_value": 238,
      "gender_percentage": 0.2205746061167748,
      "total_percentage": 0.1102873030583874
    }, {
      "age": "80",
      "actual_value": 278,
      "gender_percentage": 0.25764596848934196,
      "total_percentage": 0.12882298424467098
    }, {
      "age": "90",
      "actual_value": 64,
      "gender_percentage": 0.05931417979610751,
      "total_percentage": 0.029657089898053754
    }]
  }
}



class Mirror extends React.Component {
  render() {
    const tmp = [];
    const dates = [];
    data.male.values.forEach(obj => {
      obj.gender = '男';
      tmp.push(obj);
    });
    data.female.values.forEach(obj => {
      obj.gender = '女';
      tmp.push(obj);
    });
    const ds = new DataSet();
    const dv = ds.createView().source(tmp);
    const scale = {
      age: {
        sync: true,
        tickCount: 7,
        formatter(v) {
          return `${v}岁`;
        }
      },
      actual_value: {
        sync: true,
        formatter(v) {
          return `${v}人`;
        }
      },
      gender: {
        sync: true
      }
    };
    return <div>
      <Chart height={600} data={dv} scale={scale} padding={[60, 60, 80, 60]} forceFit>
        <Tooltip />
        <Legend />
        <Facet type="mirror" fields={['gender']} transpose eachView={view => {
          view.interval().position('age*actual_value').color('gender', ['rgb(113,192,235)', 'rgb(246,170,203)']);
        }} />
      </Chart>
    </div>;
  }

}

ReactDOM.render(<Mirror />, document.getElementById('mountNode'));


