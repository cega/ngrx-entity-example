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
    (state, { article })  => fromAdapter.adapter.addOne(article, state)),
  on(fromActions.addArticles,
    (state, { articles })  => fromAdapter.adapter.addMany(articles, state)),
  on(fromActions.updateArticle,
    (state, { article })  => fromAdapter.adapter.updateOne(article, state)),
  on(fromActions.updateArticles,
    (state, { articles })  => fromAdapter.adapter.updateMany(articles, state)),
  on(fromActions.removeArticle,
    (state, { id })  => fromAdapter.adapter.removeOne(id, state)),
  on(fromActions.removeArticles,
    (state, { ids })  => fromAdapter.adapter.removeMany(ids, state)),
  on(fromActions.clearArticles,
    (state)               => fromAdapter.adapter.removeAll({...state, selectedArticleId: null })),
  on(fromActions.loadArticlesSuccess,
    (state, { articles })  => fromAdapter.adapter.setAll(articles, state)),
  on(fromActions.selectArticle,
    (state, { articleId })  => Object.assign({...state, selectedArticleId: articleId})),
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