const config = {
    idProject: 0, // Номер проекта (Number progect)
    key: 'Ключ полученый по ссылке выше', // Api key (obtained from the link above)
    token: 'Токен полученый по ссылке выше', // Token obtained from the link above
    idLabels: 'Ид иконки которую вы создаете сами в Trello', // The id of the icon you create yourself in Trello
    idList: 'Ид списка куда будут приходить карточки' // List ID where cards will be sent
};


function searchTrello(query, url) {
    return new Promise(resolve => {

        // FlareApp 00 - error
        fetch('https://trello.com/'+config.idProject+'/search?key=' + config.key + '&token=' + config.token + '&query=' + (query)).then(response => {
            response.json().then(res => {
                if (res.cards.length < 1) {

                    fetch('https://trello.com/'+config.idProject+'/cards?key=' + config.key + '&idLabels=' + config.idLabels + '&token=' + config.token + '&name=' + encodeURI(query) + '&idList=' + config.idList + '&desc=' + encodeURI(url), {
                        method: 'POST',
                        headers: {'Accept': 'application/json'}
                    }).then(res1 => {
                        res1.json().then(res2 => {
                            resolve(res2);
                        })

                    }).catch(_ => {
                        resolve(0);
                    });

                } else {
                    const id = res.cards[0].id;
                    fetch('https://trello.com/'+config.idProject+'/cards/' + id + '?key=' + config.key + '&idLabels=' + config.idLabels + '&token=' + config.token + '&idList=' + config.idList + '&closed=false&desc=' + encodeURI(url), {
                        method: 'PUT',
                        headers: {'Accept': 'application/json'}
                    }).then(res1 => {
                        res1.json().then(res2 => {
                            resolve(res2);
                        })
                    }).catch(_ => {
                        resolve(0);
                    });
                }
            }).catch(_ => {
                resolve(0);
            });
        }).catch(_ => {
            resolve(0);
        });


    });
}

function getCountTrello(query) {
    // FlareApp 00 - error
    return new Promise(resolve => {
        fetch('https://trello.com/'+config.idProject+'/search?key=' + config.key + '&token=' + config.token + '&query=' + (query)).then(response => {
            response.json().then(res => {
                if (res.cards.length) {
                    resolve(res.cards[0].url);
                } else {
                    resolve(0);
                }
            })
        }).catch(_ => {
            resolve(0);
        });
    });
}


// class

var data = {};

var init = function (socket) {

    socket.postMessage({
        function: 'getCookie',
        arguments: null
    })
    socket.postMessage({
        function: 'getUrl',
        arguments: null
    })

    socket.onMessage.addListener(function (msg) {
        console.error(msg)

        if (msg.function) {
            data[msg.function] = msg;
            if (msg.function == 'getTrello') {
                const other_query = 'FlareApp ' + msg.return.id + ' ' + msg.return.exception_message;
                getCountTrello(other_query).then(count => {
                    socket.postMessage({
                        function: 'setCount',
                        arguments: count
                    })
                });
            }
            if (msg.function == 'sendTrello') {
                const query = 'FlareApp ' + msg.return.id + ' ' + msg.return.exception_message;
                const url = msg.return.links.show;
                searchTrello(query, url).then(res => {
                    if (res) {
                        socket.postMessage({
                            function: 'viewMessage',
                            arguments: res
                        })
                    } else {
                        socket.postMessage({
                            function: 'viewMessage',
                            arguments: 'Ошибка'
                        })
                    }
                })
            }
        }
    });

}

// functions

init.prototype.getCookie = function () {

}


// init

if (!chrome || !chrome.runtime) {
    window.chrome = {
        runtime: {
            getManifest: () => {
            }, onConnect: {
                addListener: () => {
                }
            }
        }
    }
}

var classInit;

chrome.runtime.onConnect.addListener(function (socket) {
    classInit = new init(socket);
})
