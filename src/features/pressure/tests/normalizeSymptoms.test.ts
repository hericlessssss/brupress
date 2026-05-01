import { describe, expect, it } from 'vitest';
import { normalizeSymptoms } from '../utils/normalizeSymptoms';

describe('normalizeSymptoms', () => {
  it('removes duplicate symptoms', () => {
    expect(normalizeSymptoms(['dizziness', 'dizziness'])).toEqual([
      'dizziness',
    ]);
  });

  it('keeps none as the only symptom when selected with other symptoms', () => {
    expect(normalizeSymptoms(['dizziness', 'none', 'strong_headache'])).toEqual(
      ['none'],
    );
  });
});

