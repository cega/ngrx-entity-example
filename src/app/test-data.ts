import { InMemoryDbService } from 'angular-in-memory-web-api';

export class TestData implements InMemoryDbService {
  createDb() {
    const articleDetails = [
      {id: 'j1', title: 'Core Java Tutorial', category: 'Java'},
      {id: 'a1', title: 'Angular Tutorial', category: 'Angular'},
    ];
    return { articles: articleDetails };
  }
} 