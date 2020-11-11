import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, Effect, createEffect, ofType } from "@ngrx/effects";
import { Observable, EMPTY } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import * as fromActions from "../actions/article.actions";
import { ArticleService } from "../services/article.service";

@Injectable()
export class ArticleEffects {
  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) {}

  loadAllArticles$ = createEffect(() => 
    this.actions$.pipe(
      ofType(fromActions.loadArticles),
      switchMap(() => 
        this.articleService.getAllArticles().pipe(
          map(data => fromActions.loadArticlesSuccess(
            {payload: { articles: data }})
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

}
