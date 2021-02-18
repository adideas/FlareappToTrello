# FlareappToTrello

```
Chrome Extensions (Расширение хром)
```

##### Flareapp - To - Trello

### Tech

Ссылки (links):

* [Trello](https://trello.com/) - облачная программа для управления проектами небольших групп, разработанная Fog Creek Software! Trello использует парадигму для управления проектами, известную как канбан. (A cloud-based small team project management software developed by Fog Creek Software! Trello uses a project management paradigm known as kanban.)
* [Trello Wikipedia](https://ru.wikipedia.org/wiki/Trello) - WikiPedia

* [FlareApp](https://flareapp.io/) - Полнофункциональное отслеживание ошибок Laravel, созданное специально для ваших приложений Laravel и интерфейсов JavaScript. (Full-stack Laravel error tracking made specifically for your Laravel applications and JavaScript frontends.)
* [Trello Wikipedia](https://ru.wikipedia.org/wiki/Trello) - WikiPedia

# Как это сделать (How do it) ?
* Заходим на сайт Трелло и получаем апи клуч и токен
* [Api Trello](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/) - Api Trello
* Открываем Файл background.js
* Редактируем строчки кода 
```sh

const config = {
    idProject: 0, // Номер проекта (Number progect)
    key: 'Ключ полученый по ссылке выше', // Api key (obtained from the link above)
    token: 'Токен полученый по ссылке выше', // Token obtained from the link above
    idLabels: 'Ид иконки которую вы создаете сами в Trello', // The id of the icon you create yourself in Trello
    idList: 'Ид списка куда будут приходить карточки' // List ID where cards will be sent
};

```
```sh

const config = {
    idProject: 1, // see in XHR NETWORK (Смотри в нетворке браузера)
    key: '45db9a40565b91d851021e8381162665',
    token: 'c40b700b88f9f339845b8a61231ade726cbd3a145135031a2c15df9d2094d4c7',
    idLabels: '5f46962d42bc54ff306cf5fe', // see in XHR NETWORK (Смотри в нетворке браузера)
    idList: '5695cbceb33a9d43ce4b5752' // see in XHR NETWORK (Смотри в нетворке браузера)
};

```

# Как установить (How install) ?

Chrome -> Extensions (Расширения) -> Режим разработчика (Develop mode) -> Загрузить распакованное расширение (Load unpack Extensions)

#### Открываем flare app и радуемся Появилась кнопка отправкить в трелло и появилась кнопка открыть в трелло
#### (Open the flare app and rejoice The send to trello button appeared and the open in trello button appeared)
