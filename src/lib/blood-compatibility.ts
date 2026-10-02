const COMPATIBILITY_MAP: Record<string, string[]> = {
  O_NEG: ['O_NEG'],
  O_POS: ['O_NEG', 'O_POS'],
  A_NEG: ['O_NEG', 'A_NEG'],
  A_POS: ['O_NEG', 'O_POS', 'A_NEG', 'A_POS'],
  B_NEG: ['O_NEG', 'B_NEG'],
  B_POS: ['O_NEG', 'O_POS', 'B_NEG', 'B_POS'],
  AB_NEG: ['O_NEG', 'A_NEG', 'B_NEG', 'AB_NEG'],
  AB_POS: [
    'O_NEG',
    'O_POS',
    'A_NEG',
    'A_POS',
    'B_NEG',
    'B_POS',
    'AB_NEG',
    'AB_POS',
  ],
};

// Can a donor with `donorGroup` give to a request needing `recipientGroup`?
export function isCompatibleDonor(
  donorGroup: string,
  recipientGroup: string,
): boolean {
  return COMPATIBILITY_MAP[recipientGroup]?.includes(donorGroup) ?? false;
}

export function formatGroup(group: string) {
  return group.replace('_POS', '+').replace('_NEG', '−');
}
