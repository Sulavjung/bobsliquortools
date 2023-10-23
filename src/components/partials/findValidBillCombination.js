export default function findValidBillCombination(one, five, ten, twenty) {
	// Ensure quantities don't exceed maximum limits
	const maxOnes = Math.min(one, 50);
	const maxFives = Math.min(five, 10);
	const maxTens = Math.min(ten, 8);
	const maxTwenties = Math.min(twenty, 8);
  
	for (let twenties = 0; twenties <= maxTwenties; twenties++) {
	  for (let tens = 0; tens <= maxTens; tens++) {
		for (let fives = 0; fives <= maxFives; fives++) {
		  for (let ones = 0; ones <= maxOnes; ones++) {
			const total = ones + 5 * fives + 10 * tens + 20 * twenties;
			if (total === 300) {
			  return {
				ones,
				fives,
				tens,
				twenties,
			  };
			}
		  }
		}
	  }
	}
  
	return -1; // No valid combination found
  }
  

  