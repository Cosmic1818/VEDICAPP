
import { Quote, QuoteCategory } from '../types';

export const quotes: Record<QuoteCategory, Quote[]> = {
  [QuoteCategory.Concentration]: [
    { text: "For the one who has conquered the mind, the mind is the best of friends; but for one who has failed to do so, his mind will remain the greatest enemy.", source: "Bhagavad Gita 6.6", category: QuoteCategory.Concentration },
    { text: "A person who is not disturbed by the incessant flow of desires—that enter like rivers into the ocean, which is ever being filled but is always still—can alone achieve peace, and not the man who strives to satisfy such desires.", source: "Bhagavad Gita 2.70", category: QuoteCategory.Concentration },
    { text: "When the mind is controlled and peaceful, it becomes steady and concentrated.", source: "Yoga Sutras 1.2", category: QuoteCategory.Concentration },
    { text: "The disciplined mind is a chariot, the senses are the horses, and the Self is the master.", source: "Katha Upanishad 1.3.3-4", category: QuoteCategory.Concentration },
    { text: "From the stillness of the mind, the power to achieve arises.", source: "Vedic Wisdom", category: QuoteCategory.Concentration },
    { text: "Let a man lift himself by his own self; let him not degrade himself. For the Self alone is the friend of the self, and the Self alone is the enemy of the self.", source: "Bhagavad Gita 6.5", category: QuoteCategory.Concentration },
    { text: "Just as a lamp in a windless place does not waver, so the transgendered yogi, whose mind is controlled, remains steady in his meditation on the transcendent self.", source: "Bhagavad Gita 6.19", category: QuoteCategory.Concentration },
    { text: "The mind is restless and difficult to restrain, but it is subdued by practice and detachment.", source: "Bhagavad Gita 6.35", category: QuoteCategory.Concentration },
  ],
  [QuoteCategory.Knowledge]: [
    { text: "There is nothing so sublime and pure as knowledge. He who has achieved this has the self-realization of a yogi.", source: "Bhagavad Gita 4.38", category: QuoteCategory.Knowledge },
    { text: "Just as a blazing fire turns firewood to ashes, O Arjuna, so does the fire of knowledge burn to ashes all reactions to material activities.", source: "Bhagavad Gita 4.37", category: QuoteCategory.Knowledge },
    { text: "The ignorant work for their own profit, Arjuna; the wise work for the welfare of the world, without thought for themselves.", source: "Bhagavad Gita 3.25", category: QuoteCategory.Knowledge },
    { text: "Knowledge is the eye of the soul.", source: "Vedic Wisdom", category: QuoteCategory.Knowledge },
    { text: "An intelligent person does not take part in the sources of misery, which are due to contact with the material senses. O son of Kuntī, such pleasures have a beginning and an end, and so the wise man does not delight in them.", source: "Bhagavad Gita 5.22", category: QuoteCategory.Knowledge },
    { text: "When you have reached the heights of spiritual knowledge, you will see all beings in your own Self, and all in Me.", source: "Bhagavad Gita 4.35", category: QuoteCategory.Knowledge },
    { text: "The one who is enlightened is free from the dualities of life.", source: "Isha Upanishad 7", category: QuoteCategory.Knowledge },
    { text: "Knowledge is the bestower of eternal bliss.", source: "Vedic Proverb", category: QuoteCategory.Knowledge },
  ],
  [QuoteCategory.Perseverance]: [
    { text: "No one who does good work will ever come to a bad end, either here or in the world to come.", source: "Bhagavad Gita 6.40", category: QuoteCategory.Perseverance },
    { text: "The man of action, who is free from attachments and acts with a sense of duty, finds supreme peace.", source: "Bhagavad Gita 5.12", category: QuoteCategory.Perseverance },
    { text: "It is better to live your own destiny imperfectly than to live an imitation of somebody else's life with perfection.", source: "Bhagavad Gita 3.35", category: QuoteCategory.Perseverance },
    { text: "A steady mind is the foundation of unwavering action.", source: "Vedic Saying", category: QuoteCategory.Perseverance },
    { text: "The path to the divine is like the sharp edge of a razor, difficult to cross.", source: "Katha Upanishad 1.3.14", category: QuoteCategory.Perseverance },
    { text: "Success is certain for the one whose resolve is firm.", source: "Yoga Vasistha", category: QuoteCategory.Perseverance },
    { text: "Little by little, one should become steady by the intelligence, and the mind should be fixed on the Self alone and should think of nothing else.", source: "Bhagavad Gita 6.25", category: QuoteCategory.Perseverance },
    { text: "Through constant effort and unwavering faith, one can achieve the highest goal.", source: "Mundaka Upanishad 3.2.4", category: QuoteCategory.Perseverance },
  ],
  [QuoteCategory.MentalStrength]: [
    { text: "The wise grieve neither for the living nor for the dead.", source: "Bhagavad Gita 2.11", category: QuoteCategory.MentalStrength },
    { text: "The soul is unbreakable and incombustible; it can neither be dampened nor dried. It is everlasting, all-pervading, unchanging, immovable, and eternally the same.", source: "Bhagavad Gita 2.24", category: QuoteCategory.MentalStrength },
    { text: "A person is made by his beliefs. As he believes, so he is.", source: "Bhagavad Gita 17.3", category: QuoteCategory.MentalStrength },
    { text: "The strong-minded are not moved by praise or blame.", source: "Vedic Proverb", category: QuoteCategory.MentalStrength },
    { text: "The mind acts like an enemy for those who do not control it.", source: "Bhagavad Gita 6.6", category: QuoteCategory.MentalStrength },
    { text: "One who is not disturbed in mind even amidst the threefold miseries or elated when there is happiness, and who is free from attachment, fear and anger, is called a sage of steady mind.", source: "Bhagavad Gita 2.56", category: QuoteCategory.MentalStrength },
    { text: "Calmness, gentleness, silence, self-restraint, and purity: these are the disciplines of the mind.", source: "Bhagavad Gita 17.16", category: QuoteCategory.MentalStrength },
    { text: "Fear not what is not real, never was and never will be. What is real, always was and cannot be destroyed.", source: "Bhagavad Gita", category: QuoteCategory.MentalStrength },
  ],
  [QuoteCategory.Dharma]: [
    { text: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.", source: "Bhagavad Gita 2.47", category: QuoteCategory.Dharma },
    { text: "Perform your obligatory duty, because action is indeed better than inaction.", source: "Bhagavad Gita 3.8", category: QuoteCategory.Dharma },
    { text: "The work of a man who is unattached to the modes of material nature and who is fully situated in transcendental knowledge merges entirely into transcendence.", source: "Bhagavad Gita 4.23", category: QuoteCategory.Dharma },
    { text: "To do one's duty, however humble, is better than to do another's, however exalted.", source: "Bhagavad Gita 18.47", category: QuoteCategory.Dharma },
    { text: "Action, which is prescribed, and which is performed without attachment, and without love or hatred, by one who is not desirous of the fruit, is said to be in the mode of goodness.", source: "Bhagavad Gita 18.23", category: QuoteCategory.Dharma },
    { text: "Where there is Dharma, there is victory.", source: "Mahabharata", category: QuoteCategory.Dharma },
    { text: "The wise man should not be attached to the results of his work, but should act with a sense of duty.", source: "Bhagavad Gita 3.25", category: QuoteCategory.Dharma },
    { text: "Let your actions be your worship.", source: "Vedic Saying", category: QuoteCategory.Dharma },
    { text: "Engage in action, O Arjuna, staying firm in yoga, abandoning attachment, and remaining balanced in success and failure. This equanimity is called yoga.", source: "Bhagavad Gita 2.48", category: QuoteCategory.Dharma },
  ],
  [QuoteCategory.SelfDiscipline]: [
    { text: "Lust, anger, and greed are the three gates to self-destructive hell.", source: "Bhagavad Gita 16.21", category: QuoteCategory.SelfDiscipline },
    { text: "The senses are so strong and impetuous, O Arjuna, that they forcibly carry away the mind even of a man of discrimination who is endeavoring to control them.", source: "Bhagavad Gita 2.60", category: QuoteCategory.SelfDiscipline },
    { text: "One should gradually, step by step, with the help of intelligence and full conviction, attain tranquility.", source: "Bhagavad Gita 6.25", category: QuoteCategory.SelfDiscipline },
    { text: "Self-control is the basis of all virtues.", source: "Vedic Wisdom", category: QuoteCategory.SelfDiscipline },
    { text: "The embodied soul who is self-controlled and detached resides happily in the city of nine gates, neither working nor causing work to be done.", source: "Bhagavad Gita 5.13", category: QuoteCategory.SelfDiscipline },
    { text: "He who is temperate in his habits of eating, sleeping, working and recreation can mitigate all material pains by practicing the yoga system.", source: "Bhagavad Gita 6.17", category: QuoteCategory.SelfDiscipline },
    { text: "The disciplined soul, who has controlled his mind and senses, is ever content.", source: "Bhagavad Gita 5.21", category: QuoteCategory.SelfDiscipline },
    { text: "Through self-control, man can achieve anything.", source: "Yoga Sutras", category: QuoteCategory.SelfDiscipline },
  ],
};

export const allQuotes: Quote[] = Object.values(quotes).flat();
