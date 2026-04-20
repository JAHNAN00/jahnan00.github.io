import works from "../content/works/works.json";

export const getAllWorks = () => works;

export const getWorkBySlug = (slug) => works.find((item) => item.slug === slug);
