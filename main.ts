input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    custom.TiltY(30)
    custom.TiltY(-30)
    custom.TiltY(-30)
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
