export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "fabio";
  }
  if (query.toLowerCase().includes("andrew id") || query.toLowerCase().includes("andrew id?")) {
    return "fabiocam";
  }
  const multiplyMatch = query.match(/What is ([\d]+(?: multiplied by [\d]+)+)\?/);
  if (multiplyMatch) {
    const nums = multiplyMatch[1].split(" multiplied by ").map((n) => parseInt(n.trim()));
    return String(nums.reduce((a, b) => a * b, 1));
  }

  const squareAndCubeMatch = query.match(/Which of the following numbers is both a square and a cube: ([\d, ]+)\?/);
  if (squareAndCubeMatch) {
    const nums = squareAndCubeMatch[1].split(",").map((n) => parseInt(n.trim()));
    const result = nums.find((n) => {
      const sqrt = Math.round(Math.sqrt(n));
      const cbrt = Math.round(Math.cbrt(n));
      return sqrt * sqrt === n && cbrt * cbrt * cbrt === n;
    });
    return result !== undefined ? String(result) : "";
  }

  const primesMatch = query.match(/Which of the following numbers are primes: ([\d, ]+)\?/);
  if (primesMatch) {
    const nums = primesMatch[1].split(",").map((n) => parseInt(n.trim()));
    const isPrime = (n: number) => {
      if (n < 2) return false;
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
      }
      return true;
    };
    return nums.filter(isPrime).join(", ");
  }

  const powerMatch = query.match(/What is (\d+) to the power of (\d+)\?/);
  if (powerMatch) {
    return String(Math.pow(parseInt(powerMatch[1]), parseInt(powerMatch[2])));
  }

  const divideMatch = query.match(/What is ([\d]+(?: divided by [\d]+)+)\?/);
  if (divideMatch) {
    const nums = divideMatch[1].split(" divided by ").map((n) => parseInt(n.trim()));
    return String(nums.reduce((a, b) => a / b));
  }

  const subtractMatch = query.match(/What is ([\d]+(?: minus [\d]+)+)\?/);
  if (subtractMatch) {
    const nums = subtractMatch[1].split(" minus ").map((n) => parseInt(n.trim()));
    return String(nums.reduce((a, b) => a - b));
  }

  const addMatch = query.match(/What is ([\d]+(?: plus [\d]+)+)\?/);
  if (addMatch) {
    const nums = addMatch[1].split(" plus ").map((n) => parseInt(n.trim()));
    return String(nums.reduce((a, b) => a + b, 0));
  }

  const largestMatch = query.match(/Which of the following numbers is the largest: ([\d, ]+)\?/);
  if (largestMatch) {
    const nums = largestMatch[1].split(",").map((n) => parseInt(n.trim()));
    return String(Math.max(...nums));
  }

  return "";
}
