import type { AdventureChallenge } from "../content";

export function challengeSolved(challenge: AdventureChallenge, selected: string[]): boolean {
  if (challenge.kind === "note") return selected.length === challenge.fields.length && challenge.fields.every((f,i)=>f.answers.some(a=>normalizeAnswer(a)===normalizeAnswer(selected[i] ?? "")));
  if (challenge.kind === "negotiation") return selected.length === 1 && negotiationNode(challenge, selected[0]).terminal === true;
  if (challenge.kind === "clock") return selected.length === 1 && selected[0] === challenge.answer;
  if (challenge.kind === "quantity") {
    return selected.length === challenge.items.length && challenge.items.every((item, index) => selected[index] === String(item.answer));
  }
  if (challenge.kind === "match") {
    return selected.length === challenge.slots.length && challenge.slots.every((slot, index) => selected[index] === slot.answer);
  }
  if (challenge.kind === "order") {
    return selected.length === challenge.tokens.length && new Set(selected).size === selected.length
      && selected.every((id, index) => /^\d+$/.test(id) && challenge.tokens[Number(id)] === challenge.tokens[index]);
  }
  return [challenge.answer,...(challenge.alternatives??[])].some(answer=>selected.length === answer.length && new Set(selected).size === selected.length && selected.every(id=>answer.includes(id)));
}

/** Deterministic ordering survives reloads; a replay changes the option layout. */
export function shuffled<T>(items: T[], seed: number): T[] {
  const result = [...items];
  let state = seed >>> 0;
  for (let i = result.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function formatPhone(digits: string): string {
  return [digits.slice(0, 4), digits.slice(4, 6), digits.slice(6, 8), digits.slice(8)].filter(Boolean).join(" ");
}

export const normalizeAnswer = (s: string) => s.normalize("NFC").trim().toLocaleLowerCase("de").replace(/\s+/g," ");
export function negotiationNode(c: Extract<AdventureChallenge,{kind:"negotiation"}>, raw: string) {
 let node=c.nodes.find(n=>n.id===c.start)!;
 for(const id of raw.split(",").filter(Boolean)) {const choice=node.choices[Number(id)]; if(!/^\d+$/.test(id) || !choice || node.terminal) return c.nodes.find(n=>n.id===c.start)!;node=c.nodes.find(n=>n.id===choice.next)!;}
 return node;
}
export const challengeVariant = (c: AdventureChallenge, seed: number): AdventureChallenge => c.variants?.length ? [c,...c.variants][(Math.max(1,seed)-1) % (c.variants.length+1)]! : c;
