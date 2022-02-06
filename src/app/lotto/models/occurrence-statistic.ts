export interface OccurrenceStatistic {
  number: number;
  count: number;
  // The percentage of occurrence by maximum count.
  occurrence: number;
  // The probability of number by total numbers.
  probability: number;
}
