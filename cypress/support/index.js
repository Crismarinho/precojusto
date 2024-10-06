import './commands'
import { getCLS } from 'web-vitals';

// Aqui,  definir a função ou chamada do `getCLS`
getCLS((metric) => {
  console.log('Cumulative Layout Shift:', metric.value);
});
// Aqui foi add o plugins do cucumber
const cucumber = require('cypress-cucumber-preprocessor').default
module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
};

