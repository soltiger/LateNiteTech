import DisplayMainPage from './components/DisplayMainPage.vue';
import DisplayBlogPost from './components/DisplayBlogPost.vue';
import EditBlogPost from './components/EditBlogPost.vue';

export default [
    { path: '/', component: DisplayMainPage },
    { path: '/display/:id', component: DisplayBlogPost },
    { path: '/edit/:id', component: EditBlogPost },
    { path: '/add', component: EditBlogPost },
];