'use strict';

function cImg(img) {
    document.getElementById('drkeihanna').src = img;
    return false;
}
function PushNotice() {
    if (!Push.Permission.has()) {
        Push.Permission.request();
    }
    Push.clear();
    Push.create('みんなこんにちは！', {
        body: '京町セイカがこの町で行っている研究をおしえちゃいます！',
        icon: '../Images/00.png',
        timeout: 5000,
        vibrate: [100, 100, 100],
        onClick: function () {
            console.log(this);
        }
    });

    setTimeout(function () {
        Push.create('', {
            body: 'このまちではいろいろな研究をしているよ',
            icon: '../Images/01.png',
            timeout: 5000,
            vibrate: [100, 100, 100],
            onClick: function () {
                console.log(this);
            }
        })
    }, 5000);
}
$(function () {
    
    $('').on('click', function () {
        Push.clear();
        Push.create('みんなこんにちは！', {
            body: '京町セイカがこの町で行っている研究をおしえちゃいます！',
            icon: '../Images/00.png',
            timeout: 5000,
            vibrate: [100, 100, 100],
            onClick: function () {
                console.log(this);
            }
        });

        setTimeout(function () {
            Push.create('', {
                body: 'このまちではいろいろな研究をしているよ',
                icon: '../Images/01.png',
                timeout: 5000,
                vibrate: [100, 100, 100],
                onClick: function () {
                    console.log(this);
                }
            })
        }, 5000);
    });
});

