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
  const addMatch = query.match(/What is (\d+) plus (\d+)\?/);
  if (addMatch) {
    return String(parseInt(addMatch[1]) + parseInt(addMatch[2]));
  }

  const largestMatch = query.match(/Which of the following numbers is the largest: ([\d, ]+)\?/);
  if (largestMatch) {
    const nums = largestMatch[1].split(",").map((n) => parseInt(n.trim()));
    return String(Math.max(...nums));
  }

  return "";
}
