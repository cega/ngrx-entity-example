import { createFeatureSelector, createReducer,  createSelector, on } from '@ngrx/store';

import { ArticleState } from '../states/app.states';
import * as fromAdapter from './article.adapter';
import * as fromActions from '../actions/article.actions';

export const initialState: ArticleState = fromAdapter.adapter.getInitialState({ 
                              selectedArticleId: null
                        });

export const reducer = createReducer(
  initialState,
  on(fromActions.addArticle,
    (state, { payload })  => fromAdapter.adapter.addOne(payload.article, state)),
  on(fromActions.addArticles,
    (state, { payload })  => fromAdapter.adapter.addMany(payload.articles, state)),
  on(fromActions.updateArticle,
    (state, { payload })  => fromAdapter.adapter.updateOne(payload.article, state)),
  on(fromActions.updateArticles,
    (state, { payload })  => fromAdapter.adapter.updateMany(payload.articles, state)),
  on(fromActions.removeArticle,
    (state, { payload })  => fromAdapter.adapter.removeOne(payload.id, state)),
  on(fromActions.removeArticles,
    (state, { payload })  => fromAdapter.adapter.removeMany(payload.ids, state)),
  on(fromActions.clearArticles,
    (state)               => fromAdapter.adapter.removeAll({...state, selectedArticleId: null })),
  on(fromActions.loadArticlesSuccess,
    (state, { payload })  => fromAdapter.adapter.addAll(payload.articles, state)),
  on(fromActions.selectArticle,
    (state, { payload })  => Object.assign({...state, selectedArticleId: payload.articleId})),
);

export const getSelectedArticleId = (state: ArticleState) => state.selectedArticleId;

export const getArticleState = createFeatureSelector<ArticleState>('articleState');

export const selectArticleIds = createSelector(getArticleState, fromAdapter.selectArticleIds);
export const selectArticleEntities = createSelector(getArticleState, fromAdapter.selectArticleEntities);
export const selectAllArticles = createSelector(getArticleState, fromAdapter.selectAllArticles);
export const articlesCount = createSelector(getArticleState, fromAdapter.articlesCount);

export const selectCurrentArticleId = createSelector(getArticleState, getSelectedArticleId);

export const selectCurrentArticle = createSelector(
  selectArticleEntities,
  selectCurrentArticleId,
  (articleEntities, articleId) => articleEntities[articleId]
);