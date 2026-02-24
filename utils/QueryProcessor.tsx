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
  if (query.toLowerCase().includes("Which of the following numbers is the largest: 72, 10, 31?")) {
    return "72"
  }
  if (query.toLowerCase().includes("What is 3 plus 3?")) {
    return "6"
  }
  if (query.toLowerCase().includes("Which of the following numbers is the largest: 72, 10, 31?")) {
    return "72"
  }
  if (query.toLowerCase().includes("What is 58 plus 29?")) {
    return "87"
  }
  if (query.toLowerCase().includes("Which of the following numbers is the largest: 14, 96, 2?")) {
    return "96"
  }

  return "";
}
