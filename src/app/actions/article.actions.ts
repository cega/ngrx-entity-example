import { Action, createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity/src/models";
import { Article } from "../models/article";

export enum ArticleActionTypes {
  ADD_ARTICLE = "[ARTICLE] Add Article",
  ADD_ARTICLES = "[ARTICLE] Add Articles",
  UPDATE_ARTICLE = "[ARTICLE] Update Article",
  UPDATE_ARTICLES = "[ARTICLE] Update Articles",
  REMOVE_ARTICLE = "[ARTICLE] Remove Article",
  REMOVE_ARTICLES = "[ARTICLE] Remove Articles",
  CLEAR_ARTICLES = "[ARTICLE] Clear Articles",
  LOAD_ALL_ARTICLES = "[ARTICLE] Load All Articles",
  LOAD_ALL_ARTICLES_SUCCESS = "[ARTICLE] Load All Articles Success",
  SELECT_ARTICLE = "[ARTICLE] Article By Id"
}

export const addArticle = createAction(
  ArticleActionTypes.ADD_ARTICLE,
  props<{ article: Article }>()
);
export const addArticles = createAction(
  ArticleActionTypes.ADD_ARTICLES,
  props<{ articles: Article[] }>()
);
export const updateArticle = createAction(
  ArticleActionTypes.UPDATE_ARTICLE,
  props<{ article: Update<Article> }>()
);
export const updateArticles = createAction(
  ArticleActionTypes.UPDATE_ARTICLES,
  props<{ articles: Update<Article>[] }>()
);
export const removeArticle = createAction(
  ArticleActionTypes.REMOVE_ARTICLE,
  props<{ id: string }>()
);
export const removeArticles = createAction(
  ArticleActionTypes.REMOVE_ARTICLES,
  props<{ ids: string[] }>()
);
export const clearArticles = createAction(ArticleActionTypes.CLEAR_ARTICLES);
export const loadArticles = createAction(ArticleActionTypes.LOAD_ALL_ARTICLES);
export const loadArticlesSuccess = createAction(
  ArticleActionTypes.LOAD_ALL_ARTICLES_SUCCESS,
  props<{ articles: Article[]  }>()
);
export const selectArticle = createAction(
  ArticleActionTypes.SELECT_ARTICLE,
  props<{ articleId: string }>()
);
