import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as fromActions from '../actions/article.actions';
import { ArticleService } from '../services/article.service';

@Injectable()
export class ArticleEffects {

  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) {}      

  loadAllArticles$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.ArticleActionTypes.LOAD_ALL_ARTICLES),    
    switchMap(() => this.articleService.getAllArticles().pipe(
      map(data => ({
        type: fromActions.ArticleActionTypes.LoadArticlesSuccess,
        payload: data
      }),
      catchError(() => EMPTY)
    )))
  ))
  // @Effect() 
  // loadAllArticles$: Observable<Action> = this.actions$.pipe(
  //     ofType(fromActions.ArticleActionTypes.LOAD_ALL_ARTICLES),
  //     switchMap(() => this.articleService.getAllArticles(),
  //     map(data => new fromActions.LoadArticlesSuccess(
  //       { articles: data }
  //     ))
  //   )
}
