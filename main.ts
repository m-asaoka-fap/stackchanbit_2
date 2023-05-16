input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    custom.SetAvatar(Avatar.Happy)
    custom.SetTextAction(CustomTextAction.SayHappy)
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.A, function () {
    custom.SetPanAction(CustomPanAction.PanRight)
})
input.onGesture(Gesture.Shake, function () {
    custom.SetAvatar(Avatar.Angry)
    custom.SetTextAction(CustomTextAction.SayAngry)
    basic.showIcon(IconNames.Angry)
})
input.onButtonPressed(Button.AB, function () {
    custom.SetTiltAction(CustomTiltAction.TiltFlont)
    custom.SetPanAction(CustomPanAction.PanFlont)
    custom.SetAvatar(Avatar.Neutral)
    custom.SetTextAction(CustomTextAction.Off)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        . . . . .
        `)
})
custom.start()
basic.showLeds(`
    . . . . .
    . # . # .
    . . . . .
    . # # # .
    . . . . .
    `)
basic.forever(function () {
	
})
