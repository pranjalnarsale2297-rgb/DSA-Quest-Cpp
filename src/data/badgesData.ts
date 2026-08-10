import { Badge } from '../types';

export const BADGES: Badge[] = [
  {
    id: 'badge_first_step',
    title: '🎯 First Step',
    description: 'Complete your first DSA Quest lesson.',
    iconName: 'Target',
    requiredTopicCount: 1,
  },
  {
    id: 'badge_quick_learner',
    title: '🧠 Quick Learner',
    description: 'Complete 5 DSA Quest lessons.',
    iconName: 'Brain',
    requiredTopicCount: 5,
  },
  {
    id: 'badge_search_master',
    title: '🔎 Search Master',
    description: 'Complete Linear Search and Binary Search.',
    iconName: 'Search',
    requiredTopicId: 'binary_search',
  },
  {
    id: 'badge_sorting_wizard',
    title: '⚡ Sorting Wizard',
    description: 'Master Bubble Sort and Array Ordering.',
    iconName: 'Zap',
    requiredTopicId: 'bubble_sort',
  },
  {
    id: 'badge_ll_ninja',
    title: '🔗 Linked List Ninja',
    description: 'Understand nodes, pointers, and reversals.',
    iconName: 'Link',
    requiredTopicId: 'singly_linked_list',
  },
  {
    id: 'badge_stack_queue_hero',
    title: '📦 LIFO & FIFO Hero',
    description: 'Master Stacks & Queues in C++.',
    iconName: 'Layers',
    requiredTopicId: 'stack',
  },
  {
    id: 'badge_tree_explorer',
    title: '🌳 Tree Explorer',
    description: 'Conquer Binary Trees and Traversals.',
    iconName: 'GitBranch',
    requiredTopicId: 'binary_tree',
  },
  {
    id: 'badge_graph_master',
    title: '🕸 Graph Master',
    description: 'Traverse complex graph networks.',
    iconName: 'Share2',
    requiredTopicId: 'graph_basics',
  },
  {
    id: 'badge_dsa_master',
    title: '🏆 DSA Master',
    description: 'Reach Level 7 and accumulate 3,000+ XP!',
    iconName: 'Trophy',
    requiredXp: 3000,
  },
];
