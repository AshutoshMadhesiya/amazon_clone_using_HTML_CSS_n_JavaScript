import { formatCurrency } from "../scripts/utils/money.js";

console.log('test suite: formatCurrency');
console.log('converts cents into dollars');
if(formatCurrency(2542) === '25.42'){
    console.log('Passed');
} else {
    console.log('Failed');
}

console.log('works with 0');
if(formatCurrency(0) === '0.00'){
    console.log('Passed');
} else {
    console.log('Failed');
}

console.log('Round up to the nearest cents');
if(formatCurrency(1000.5) === '10.01'){
    console.log('Passed');
} else {
    console.log('Failed');
}
