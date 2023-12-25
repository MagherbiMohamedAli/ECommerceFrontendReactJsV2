import Api from "../axios/api";
const ARTICLE_API = "articles"
export const fetcharticles = async () => {
    return await Api.get(ARTICLE_API);
}
export const fetcharticleById = async (articleId) => {
    return await Api.get(ARTICLE_API + '/' + articleId);
}
export const deletearticle = async (articleId) => {
    return await Api.delete(ARTICLE_API + '/' + articleId);
}
export const addarticle = async (article) => {
    return await Api.post(ARTICLE_API, article);
}
export const updatearticle = (article) => {
    return Api.put(ARTICLE_API + '/' + article._id, article);
}