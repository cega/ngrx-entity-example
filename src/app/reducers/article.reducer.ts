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

// export function reducer(state = initialState, action: fromActions.ARTICLE_ACTIONS): ArticleState {
//   console.log(action);
//   switch(action.type) {
//     case fromActions.ArticleActionTypes.ADD_ARTICLE: {
//       // console.log('In Articles reducer- payload: ', action.payload);
//       return fromAdapter.adapter.addOne(action.payload.article, state);
//     }
//     case fromActions.ArticleActionTypes.ADD_ARTICLES: { 
//       return fromAdapter.adapter.addMany(action.payload.articles, state);
//     }
//     case fromActions.ArticleActionTypes.UPDATE_ARTICLE: {
//       return fromAdapter.adapter.updateOne(action.payload.article, state);
//     }
//     case fromActions.ArticleActionTypes.UPDATE_ARTICLES: {
//       return fromAdapter.adapter.updateMany(action.payload.articles, state);
//     }
//     case fromActions.ArticleActionTypes.REMOVE_ARTICLE: {
//       return fromAdapter.adapter.removeOne(action.payload.id, state);
//     }
//     case fromActions.ArticleActionTypes.REMOVE_ARTICLES: {
//       return fromAdapter.adapter.removeMany(action.payload.ids, state);
//     }
//     case fromActions.ArticleActionTypes.CLEAR_ARTICLES: {
//       return fromAdapter.adapter.removeAll({ ...state, selectedArticleId: null });
//     }
//     case fromActions.ArticleActionTypes.LOAD_ALL_ARTICLES_SUCCESS: {
//       return fromAdapter.adapter.addAll(action.payload.articles, state);
//     }
//     case fromActions.ArticleActionTypes.SELECT_ARTICLE: {
//       return Object.assign({ ...state, selectedArticleId: action.payload.articleId });
//     }     
//     default: {
//       return state;
//     }
//   }	
// }

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