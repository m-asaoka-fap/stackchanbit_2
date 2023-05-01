/*
 * StackChan:bit for micro:bit customblocks
 * 
 * Copyright © 2023 FAP. All rights reserved.
 *
 * 2023.04.29  (FAP)m-asaoka  新規作成
 *
 */
enum Avatar {
    //% block="怒る（おこる）"
    Angry = 0,
    //% block="眠い（ねむい）"
    Sleepy = 1,
    //% block="嬉しい（うれしい）"
    Happy = 2,
    //% block="悲しい（かなしい）"
    Sat = 3,
    //% block="冷や汗（ひやあせ）"
    Doubt = 4,
    //% block="普通（ふつう）"
    Neutral = 5
}
/**
 *  Pan動作の種別（左右）
 */
enum CustomPanAction {
    //% block="正面（しょうめん）を向く（むく）"
    PanFlont = 0,
    //% block="右（みぎ）を向く（むく）"
    PanRight = 1,
    //% block="左（ひだり）を向く（むく）"
    PanLeft = 2
}
/**
 *  Tilt動作の種別（上下）
 */
enum CustomTiltAction {
    //% block="正面（しょうめん）を向く（むく）"
    TiltFlont = 0,
    //% block="上（うえ）に向く（むく）"
    TiltUp = 1,
    //% block="下（した）に向く（むく）"
    TiltDown = 2
}
/**
 *  吹き出し（ふきだし）の種別
 */
enum CustomTextAction {  
    //% block="消す（けす）"
    Off = 0,
    //% block="「こんにちは」"
    SayHello = 1,
    //% block="「おはよう」"
    SayGoodMorning = 2,
    //% block="「おやすみなさい」"
    SayGoodNight = 3,
    //% block="「おこった」"
    SayAngry = 4,
    //% block="「うれしい」"
    SayHappy = 5,
    //% block="「かなしい」"
    SaySat = 6,
    //% block="「うーん」"
    SayDoubt = 7
}
/**
 *  カスタムブロック
 */
//% weight=0 color=#F22E1F icon="\uf076" block="スタックチャン"
namespace custom {
    let b_Init = false; 　              // セットアップ準備ができているかどうか
    let tiltStatus = 0;                 // 上下に傾いている角度
    let panStatus = 0;                  // 左右に傾いている角度
    let avatarStatus = Avatar.Neutral;  // アバターの状態
    let textStatus = CustomTextAction.Off;
    /**
    * スタックチャンびっとを使うための設定を行います
    */
    //% block="スタックチャンをはじめる"
    //% group="設定（せってい）"
    export function start(): void {
        // シリアル通信をセットアップする
        serial.redirect(
            SerialPin.P0,
            SerialPin.P1,
            BaudRate.BaudRate115200
        )
        // リセットを実行
        Reset();
        // 初期化完了
        b_Init = true;
    }
    /**
    * 表情（ひょうじょう）を設定（せってい）するよ！
    */
    //% block="表情（ひょうじょう）を　%value に設定（せってい）する"
    // Avatar.defl = Avatar.Neutral
    //% group="レベル1"
    export function SetAvatar(value: Avatar): void {
        sendText("E" + value);
        avatarStatus = value;
    }
    /**
    * スタックチャンを左右（さゆう）にうごかすよ
    */
    //% block="横（よこ）のうごきを　%value に設定（せってい）する"
    //% group="レベル1"
    export function SetPanAction(value: CustomPanAction) : void {
        let destValue = 0;
        switch(value) {
            case CustomPanAction.PanRight:
                destValue = panStatus + 45;
                break;
            case CustomPanAction.PanLeft:
                destValue = panStatus - 45;
                break;
            case CustomPanAction.PanFlont:
            default:
                break;
        }
        PanX(destValue);
    }
    /**
    * スタックチャンを上下（じょうげ）にうごかすよ
    */
    //% block="上下（じょうげ）のうごきを　%value に設定（せってい）する"
    //% group="レベル1"
    export function SetTiltAction(value: CustomTiltAction): void {
        let destValue = 0;
        switch (value) {
            case CustomTiltAction.TiltUp:
                destValue = tiltStatus + 15;
                break;
            case CustomTiltAction.TiltDown:
                destValue = tiltStatus - 15;
                break;
            case CustomTiltAction.TiltFlont:
            default:
                break;
        }
        TiltY(destValue);
    }
    /**
    * スタックチャンの吹き出し（ふきだし）を設定（せってい）するよ
    */
    //% block="吹き出し（ふきだし）を　%value に設定（せってい）する"
    //% group="レベル1"
    export function SetTextAction(value: CustomTextAction) : void {
        let strValue = "";
        switch(value) {
            case CustomTextAction.SayHello:
                strValue = "こんにちは";
                break;
            case CustomTextAction.SayGoodMorning:
                strValue = "おはよう";
                break;
            case CustomTextAction.SayGoodNight:
                strValue = "おやすみなさい";
                break;
            case CustomTextAction.SayAngry:
                strValue = "おこった";
                break;
            case CustomTextAction.SayHappy:
                strValue = "うれしい";
                break;
            case CustomTextAction.SaySat:
                strValue = "かなしい";
                break;
            case CustomTextAction.SayDoubt:
                strValue = "うーん";
                break;
            case CustomTextAction.Off:
            default:
                break;
        }
        sendText(strValue);
        textStatus = value;
    }
    /**
    * 感情（かんじょう）を取得（しゅとく）するよ！
    */
    //% block="いまの表情（ひょうじょう）"
    //% weight=60
    //% group="レベル2"
    export function getAvatar(): Avatar {
        return avatarStatus;
    }
    /**
    * 「怒る（おこる）」
    */
    //% block="怒る（おこる）"
    //% weight=40
    //% group="レベル2"
    export function getAngry() : Avatar {
        return Avatar.Angry;
    }
    /**
    * 「眠い（ねむい）」
    */
    //% block="眠い（ねむい）"
    //% weight=40
    //% group="レベル2"
    export function getSleepy(): Avatar {
        return Avatar.Sleepy;
    }
    /**
    * 「嬉しい（うれしい）」
    */
    //% block="嬉しい（うれしい）"
    //% weight=40
    //% group="レベル2"
    export function getHappy() : Avatar {
        return Avatar.Happy;
    }
    /**
    * 「悲しい（かなしい）」
    */
    //% block="悲しい（かなしい）"
    //% weight=40
    //% group="レベル2"
    export function getSat() : Avatar {
        return Avatar.Sat;
    }
    /**
    * 「冷や汗（ひやあせ）」
    */
    //% block="冷や汗（ひやあせ）"
    //% weight=40
    //% group="レベル2"
    export function getDoubt() : Avatar {
        return Avatar.Doubt;
    }
    /**
    * 「普通（ふつう）」
    */
    //% block="普通（ふつう）"
    //% weight=40
    //% group="レベル2"
    export function getNeutral() : Avatar {
        return Avatar.Neutral
    }
    /**
    * スタックチャンに吹き出し（ふきだし）をつけます
    */
    //% block="吹き出し（ふきだし）をつける %value "
    // string.defl = string
    //% group="レベル2"
    export function SendSpeakValue(value: string): void {
        sendText("T" + value);
    }

    /**
    * いまの縦（たて）の傾き（かたむき）を取得（しゅとく）するよ
    */
    //% block="いまの上下（じょうげ）の傾き（かたむき）（度（ど））"
    //% group="レベル3"
    export function getTiltStatus(): number {
        return tiltStatus;
    }
    /**
    * いまの横（よこ）の傾き（かたむき）を取得（しゅとく）するよ
    */
    //% block="いまの横（よこ）の傾き（かたむき）（度（ど））"
    //% group="レベル3"
    export function getPanStatus(): number {
        return panStatus;
    }
    /**
    * スタックチャンを左右（さゆう）に動かします
    */
    //% block="%value 度 左右（さゆう）に動かす"
    //% group="レベル3"
    export function PanX(value: number): void {
        if ((value < -90) || (value > 90)) {
            return;
        }
        sendText("X" + value);
        panStatus = value;
    }
    /**
    * スタックチャンを上下（じょうげ）に動かします
    */
    //% block="%value 度 上下（じょうげ）に動かす"
    //@param 上下（じょうげ）の角度（かくど）を設定します value , eg: 10
    //% group="レベル3"
    export function TiltY(value: number): void {
        if ((value < 0) || (value > 30)) {
            return;
        }
        sendText("Y" + value);
        tiltStatus = value;
    }

    /**
    * 状態をリセットします
    */
    export function Reset() : void {
        // Panアクションを初期値に
        SetPanAction(CustomPanAction.PanFlont);
        // Tiltアクションを初期値に
        SetTiltAction(CustomTiltAction.TiltFlont);
        // 吹き出しをリセット
        SetTextAction(CustomTextAction.Off);
        // 表情をリセット
        SetAvatar(Avatar.Neutral);
    }
    /**
    * シリアル通信で文字列を送信します
    */
    export function sendText (value: string): void {
        // 初期化ができていないときは処理をしない
        if (b_Init != true) {
            return;
        }
        // シリアル通信にて、文字列を送信する
        serial.writeLine(value);
    }
}

