input.onButtonPressed(Button.A, function () {
    custom.SetTiltAction(CustomTiltAction.TiltUp)
    custom.SetTiltAction(CustomTiltAction.TiltDown)
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
