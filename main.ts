input.onButtonPressed(Button.A, function () {
    custom.SetTiltAction(CustomTiltAction.TiltUp)
    basic.pause(2000)
    custom.SetTiltAction(CustomTiltAction.TiltUp)
    basic.pause(2000)
    custom.SetTiltAction(CustomTiltAction.TiltDown)
    basic.pause(2000)
    custom.SetTiltAction(CustomTiltAction.TiltDown)
    basic.pause(2000)
    custom.SetTextAction(CustomTextAction.SayHello)
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
