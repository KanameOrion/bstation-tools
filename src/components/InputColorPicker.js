import { useEffect, useState } from 'react'
import { SketchPicker } from 'react-color'

const InputColorPicker = (props) => {
    const [colorPickerState, setcolorPickerState] = useState(false);
    const [colorCode, setColorCode] = useState("#000000");

    const openColorPickerHandler = () => {
        setcolorPickerState(true);
    };
    
    const closeColorPickerHandler = () => {
        setcolorPickerState(false);
    };

    const SetColorType = (color) => {
        if (props.colorType === "hex")
            return color.hex;

        if (props.colorType === "rgb")
            return "rgb(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + ")";

        if (props.colorType === "rgba")
            return "rgb(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")";

        return color.hex;
    };

    const colorPickerHandler = (color) => {
        setColorCode(SetColorType(color));

        if (props.color != null)
            props.color(SetColorType(color));
    };

    const popover = {
        position: 'absolute',
        zIndex: '2',
    }
    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }
    useEffect(() => {
        if (props.setColor != null)
            setColorCode(props.setColor);
    }, [props.setColor])

    return (
        <div>
            <input type="text" value={colorCode} readOnly={true} min="4" max="100" onClick={openColorPickerHandler} className="form-control" />
            {colorPickerState ? <div style={popover}>
                <div style={cover} onClick={closeColorPickerHandler} />
                <SketchPicker
                    onChange={colorPickerHandler}
                    color={colorCode}
                />
            </div> : null}

        </div>
    );
};

export default InputColorPicker