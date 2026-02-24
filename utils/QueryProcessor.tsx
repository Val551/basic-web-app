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
    let base = BigInt(powerMatch[1]);
    let exp = parseInt(powerMatch[2]);
    let result = BigInt(1);
    for (let i = 0; i < exp; i++) result *= base;
    return String(result);
  }

  const arithmeticMatch = query.match(/What is (.+)\?/);
  if (arithmeticMatch && /\b(plus|minus|multiplied by|divided by)\b/.test(arithmeticMatch[1])) {
    const tokens = arithmeticMatch[1].match(/(\d+|multiplied by|divided by|plus|minus)/g) || [];
    const nums: number[] = [];
    const ops: string[] = [];
    for (const token of tokens) {
      if (/^\d+$/.test(token)) nums.push(parseInt(token));
      else ops.push(token);
    }
    // First pass: multiplication and division
    let i = 0;
    while (i < ops.length) {
      if (ops[i] === "multiplied by" || ops[i] === "divided by") {
        const result = ops[i] === "multiplied by" ? nums[i] * nums[i + 1] : nums[i] / nums[i + 1];
        nums.splice(i, 2, result);
        ops.splice(i, 1);
      } else {
        i++;
      }
    }
    // Second pass: addition and subtraction
    let result = nums[0];
    for (let j = 0; j < ops.length; j++) {
      if (ops[j] === "plus") result += nums[j + 1];
      else if (ops[j] === "minus") result -= nums[j + 1];
    }
    return String(result);
  }

  const anagramMatch = query.match(/Which of the following is an anagram of (\w+): (.+)\?/);
  if (anagramMatch) {
    const sorted = (s: string) => s.toLowerCase().split("").sort().join("");
    const target = sorted(anagramMatch[1]);
    const words = anagramMatch[2].split(",").map((w) => w.trim());
    const result = words.find((w) => sorted(w) === target);
    return result || "";
  }

  const largestMatch = query.match(/Which of the following numbers is the largest: ([\d, ]+)\?/);
  if (largestMatch) {
    const nums = largestMatch[1].split(",").map((n) => parseInt(n.trim()));
    return String(Math.max(...nums));
  }

  return "";
}
