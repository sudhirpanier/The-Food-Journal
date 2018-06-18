import { Component } from '@angular/core';

import { ArticlesPage } from '../articles/articles';
import { PromotionsPage } from '../promotions/promotions';
import { JournalPage } from '../journal/journal';
import { ContestPage } from '../contest/contest';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = JournalPage;
  tab2Root = ArticlesPage;
  tab3Root = PromotionsPage;
  tab4Root = ContestPage;

  constructor() {

  }
}
