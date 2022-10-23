import { useState } from 'react';
import { Buffer } from 'buffer';
import InputColorPicker from '../components/InputColorPicker';
import reactToCss from 'react-style-object-to-css'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import GFontData from '../data/googleFont.json';
import VKPrettier from 'vkbeautify';
import CopyToClipboard from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HomePage = () => {
    const [urlIFrame, seturlIFrame] = useState('/chatrender');
    const [renderedCss, setRenderedCss] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const [bgPreview, setBgPreview] = useState("#ffffff");

    const [chatConfig, setChatConfig] = useState({
        importFont: {
            viewer: "",
            message: "",
        },
        viewer: {
            fontSize: "16px",
            color: "#000000",
            backgroundColor: "rgb(255,255,255,0)",
            paddingLeft: "0px",
            paddingTop: "0px",
            paddingRight: "0px",
            paddingBottom: "0px",
            marginLeft: "0px",
            marginTop: "0px",
            marginRight: "0px",
            marginBottom: "0px",
            textShadow: "0px 0px 0px rgb(255,255,255,0) !important",
            boxShadow: "0px 0px 0px 0px rgb(255,255,255,0) !important",
            border: "0px solid rgb(255,255,255,0) !important",
            borderRadius: "0px",
            textTransform: "none",
            fontStyle: "normal",
            fontWeight: "normal",
            fontFamily: "Noto Sans Rejang",
        },
        message: {
            fontSize: "16px",
            color: "#000000",
            backgroundColor: "rgb(255,255,255,0)",
            paddingLeft: "0px",
            paddingTop: "0px",
            paddingRight: "0px",
            paddingBottom: "0px",
            marginLeft: "0px",
            marginTop: "0px",
            marginRight: "0px",
            marginBottom: "0px",
            textShadow: "0px 0px 0px rgb(255,255,255,0) !important",
            boxShadow: "0px 0px 0px 0px rgb(255,255,255,0) !important",
            border: "0px solid rgb(255,255,255,0) !important",
            borderRadius: "0px",
            textTransform: "none",
            fontStyle: "normal",
            fontWeight: "normal",
            fontFamily: "Noto Sans Rejang",
        },
        basic: {
            hideSystem: 0,
        }
    });

    const ChangeCssPropertyGroup = (stringConfig, newValue, index) => {
        let arrStringConfig = stringConfig.split(" ");
        arrStringConfig[index] = newValue;

        return arrStringConfig.join(" ");
    }

    const GetCssPropertyGroup = (stringConfig, index) => {
        let arrStringConfig = stringConfig.split(" ");
        return arrStringConfig[index];
    }

    const FontSelectorHandler = (index, configCategory) => {
        if (chatConfig[configCategory] == null)
            return;

        let prevState = chatConfig;
        if (index == 0) {
            prevState[configCategory]['fontFamily'] = "Noto Sans Rejang";
            prevState['importFont'][configCategory] = "";
            setChatConfig(prevState);

            return;
        }

        let selectedFont = GFontData[index];
        let formattedUrlFont = selectedFont.name.replace(/\s+/g, '+');

        prevState['importFont'][configCategory] = 'https://fonts.googleapis.com/css2?family=' + formattedUrlFont + '&display=swap';
        prevState[configCategory]['fontFamily'] = "'" + selectedFont.name + "'";
        setChatConfig(prevState);
    };

    const ApplyConfig = () => {
        let cssViewer = reactToCss(chatConfig.viewer);
        let cssMessage = reactToCss(chatConfig.message);
        let jsonConfig = `.light .message-text-part.type-name
            {
                ${cssViewer}
            }

            .light .message-text-part:not(.type-name)
            {
                ${cssMessage}
            }
            `;
        if (chatConfig.importFont.viewer != "")
            jsonConfig = "@import url('" + chatConfig.importFont.viewer + "');\n\n" + jsonConfig;

        if (chatConfig.basic.hideSystem == 1)
            jsonConfig = `${jsonConfig}\n\n#items .yt-live-chat-item-list-renderer:nth-child(1),#items .yt-live-chat-item-list-renderer:nth-child(2)
            {
                display: none;
            }`;

        setIsEdited(true);
        setRenderedCss(VKPrettier.css(jsonConfig.split(";").join(";\n")));
        let encodedConfig = Buffer.from(jsonConfig).toString("base64");
        seturlIFrame('/chatrender?cfg=' + encodedConfig);
    };

    return (
        <div className="pt-4">
            <ToastContainer />
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Livechat Customizer</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 order-md-1 order-sm-2">
                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <div className="accordion" id="accordionExample">

                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="heading-overview">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colOverview" aria-expanded="false" aria-controls="colOverview">
                                                    Basic
                                                </button>
                                            </h2>
                                            <div id="colOverview" className="accordion-collapse collapse" aria-labelledby="heading-overview" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="row align-items-center mb-3 g-3">
                                                                <div className="col-md-12">
                                                                    <label className="form-label">Font</label>
                                                                    <div className="input-group">
                                                                        <select className="form-select" defaultValue="0" onChange={(e) => {
                                                                            FontSelectorHandler(e.target.value, "viewer");
                                                                            FontSelectorHandler(e.target.value, "message");
                                                                        }}>
                                                                            {
                                                                                GFontData.map((font, idx) => {
                                                                                    return <option key={idx} value={idx}>{font.name}</option>
                                                                                })
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-text">Fonts provided by Google Fonts.</div>
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center mb-3 g-3">
                                                                <div className="col-md-6">
                                                                    <label className="form-label">System Message</label>
                                                                    <div className="input-group">
                                                                        <select className="form-select" defaultValue={chatConfig.basic.hideSystem} onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                basic: {
                                                                                    ...prevState.basic,
                                                                                    hideSystem: e.target.value
                                                                                }
                                                                            }))
                                                                        }}>
                                                                            <option value="0">Show System Message</option>
                                                                            <option value="1">Hide System Message</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Preview Background</label>
                                                                    <InputColorPicker setColor={bgPreview} color={(color) => {
                                                                        setBgPreview(color);
                                                                    }} colorType="rgba" />
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-center g-3">
                                                                <div className="d-grid gap-2">
                                                                    <button className="btn btn-primary" type="button" onClick={ApplyConfig}>Apply</button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#username">
                                                    Viewer Username
                                                </button>
                                            </h2>
                                            <div id="username" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="row align-items-center mb-3 g-3">
                                                                <div className="col-md-12">
                                                                    <div style={{ fontSize: "1.3rem", marginBottom: "-10px" }}>Text Option</div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Font Size</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="4" max="100" value={chatConfig.viewer.fontSize.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    fontSize: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Font Color</label>
                                                                    <InputColorPicker setColor={chatConfig.viewer.color} color={(color) => {
                                                                        setChatConfig(prevState => ({
                                                                            ...prevState,
                                                                            viewer: {
                                                                                ...prevState.viewer,
                                                                                color: color + ' !important'
                                                                            }
                                                                        }))
                                                                    }} />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Background Color</label>
                                                                    <InputColorPicker setColor={chatConfig.viewer.backgroundColor} color={(color) => {
                                                                        setChatConfig(prevState => ({
                                                                            ...prevState,
                                                                            viewer: {
                                                                                ...prevState.viewer,
                                                                                backgroundColor: color + ' !important'
                                                                            }
                                                                        }))
                                                                    }} colorType="rgba" />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Transform</label>
                                                                    <div className="input-group">
                                                                        <select className="form-select" defaultValue="none" onChange={
                                                                            (e) => {
                                                                                setChatConfig(prevState => ({
                                                                                    ...prevState,
                                                                                    viewer: {
                                                                                        ...prevState.viewer,
                                                                                        textTransform: e.target.value
                                                                                    }
                                                                                }))
                                                                            }
                                                                        }>
                                                                            <option value="none">None</option>
                                                                            <option value="capitalize">Text Capitalized</option>
                                                                            <option value="uppercase">TEXT UPPERCASE</option>
                                                                            <option value="lowercase">text lowercase</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Italic</label>
                                                                    <div className="input-group">
                                                                        <select className="form-select" defaultValue="normal" onChange={
                                                                            (e) => {
                                                                                setChatConfig(prevState => ({
                                                                                    ...prevState,
                                                                                    viewer: {
                                                                                        ...prevState.viewer,
                                                                                        fontStyle: e.target.value
                                                                                    }
                                                                                }))
                                                                            }
                                                                        }>
                                                                            <option value="normal">None</option>
                                                                            <option value="italic">Yes</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Bold</label>
                                                                    <div className="input-group">
                                                                        <select className="form-select" defaultValue="normal" onChange={
                                                                            (e) => {
                                                                                setChatConfig(prevState => ({
                                                                                    ...prevState,
                                                                                    viewer: {
                                                                                        ...prevState.viewer,
                                                                                        fontWeight: e.target.value
                                                                                    }
                                                                                }))
                                                                            }
                                                                        }>
                                                                            <option value="normal">None</option>
                                                                            <option value="bold">Yes</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-center mb-3 g-3">
                                                                <div className="col-md-12">
                                                                    <div style={{ fontSize: "1.3rem", marginBottom: "-10px" }}>Padding</div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Left</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={chatConfig.viewer.paddingLeft.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    paddingLeft: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Top</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={chatConfig.viewer.paddingTop.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    paddingTop: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Right</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={chatConfig.viewer.paddingRight.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    paddingRight: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Bottom</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={chatConfig.viewer.paddingBottom.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    paddingBottom: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-center mb-3 g-3">
                                                                <div className="col-md-12">
                                                                    <div style={{ fontSize: "1.3rem", marginBottom: "-10px" }}>Margin</div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Left</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="-100" max="100" value={chatConfig.viewer.marginLeft.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    marginLeft: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Top</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="-100" max="100" value={chatConfig.viewer.marginTop.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    marginTop: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Right</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="-100" max="100" value={chatConfig.viewer.marginRight.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    marginRight: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Bottom</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="-100" max="100" value={chatConfig.viewer.marginBottom.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    marginBottom: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-center mb-3 g-3">
                                                                <div className="col-md-12">
                                                                    <div style={{ fontSize: "1.3rem", marginBottom: "-10px" }}>Text Shadow</div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Shift Right</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="-100" max="100" value={GetCssPropertyGroup(chatConfig.viewer.textShadow, 0).replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    textShadow: ChangeCssPropertyGroup(prevState.viewer.textShadow, e.target.value + "px", 0)
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Shift Down</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="-100" max="100" value={GetCssPropertyGroup(chatConfig.viewer.textShadow, 1).replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    textShadow: ChangeCssPropertyGroup(prevState.viewer.textShadow, e.target.value + "px", 1)
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Blur</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={GetCssPropertyGroup(chatConfig.viewer.textShadow, 2).replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    textShadow: ChangeCssPropertyGroup(prevState.viewer.textShadow, e.target.value + "px", 2)
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Color</label>
                                                                    <InputColorPicker colorType="rgba" setColor={GetCssPropertyGroup(chatConfig.viewer.textShadow, 3)} color={(color) => {
                                                                        setChatConfig(prevState => ({
                                                                            ...prevState,
                                                                            viewer: {
                                                                                ...prevState.viewer,
                                                                                textShadow: ChangeCssPropertyGroup(prevState.viewer.textShadow, color, 3)
                                                                            }
                                                                        }))
                                                                    }} />
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-center mb-3 g-3">
                                                                <div className="col-md-12">
                                                                    <div style={{ fontSize: "1.3rem", marginBottom: "-10px" }}>Box Shadow</div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Shift Right</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="-100" max="100" value={GetCssPropertyGroup(chatConfig.viewer.boxShadow, 0).replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    boxShadow: ChangeCssPropertyGroup(prevState.viewer.boxShadow, e.target.value + "px", 0)
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Shift Down</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="-100" max="100" value={GetCssPropertyGroup(chatConfig.viewer.boxShadow, 1).replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    boxShadow: ChangeCssPropertyGroup(prevState.viewer.boxShadow, e.target.value + "px", 1)
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Blur</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={GetCssPropertyGroup(chatConfig.viewer.boxShadow, 2).replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    boxShadow: ChangeCssPropertyGroup(prevState.viewer.boxShadow, e.target.value + "px", 2)
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Spread</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={GetCssPropertyGroup(chatConfig.viewer.boxShadow, 3).replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    boxShadow: ChangeCssPropertyGroup(prevState.viewer.boxShadow, e.target.value + "px", 3)
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Color</label>
                                                                    <InputColorPicker colorType="rgba" setColor={GetCssPropertyGroup(chatConfig.viewer.boxShadow, 4)} color={(color) => {
                                                                        setChatConfig(prevState => ({
                                                                            ...prevState,
                                                                            viewer: {
                                                                                ...prevState.viewer,
                                                                                boxShadow: ChangeCssPropertyGroup(prevState.viewer.boxShadow, color, 4)
                                                                            }
                                                                        }))
                                                                    }} />
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-center mb-3 g-3">
                                                                <div className="col-md-12">
                                                                    <div style={{ fontSize: "1.3rem", marginBottom: "-10px" }}>Border</div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Thickness</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={GetCssPropertyGroup(chatConfig.viewer.border, 0).replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    border: ChangeCssPropertyGroup(prevState.viewer.border, e.target.value + "px", 0)
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Style</label>
                                                                    <div className="input-group">
                                                                        <select className="form-select" defaultValue="none" onChange={
                                                                            (e) => {
                                                                                setChatConfig(prevState => ({
                                                                                    ...prevState,
                                                                                    viewer: {
                                                                                        ...prevState.viewer,
                                                                                        border: ChangeCssPropertyGroup(prevState.viewer.border, e.target.value, 1)
                                                                                    }
                                                                                }))
                                                                            }
                                                                        }>
                                                                            <option value="none">none</option>
                                                                            <option value="dotted">Dotted</option>
                                                                            <option value="dashed">Dashed</option>
                                                                            <option value="solid">Solid</option>
                                                                            <option value="double">Double</option>
                                                                            <option value="groove">Groove</option>
                                                                            <option value="ridge">Ridge</option>
                                                                            <option value="inset">Inset</option>
                                                                            <option value="outset">Outset</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Color</label>
                                                                    <InputColorPicker setColor={GetCssPropertyGroup(chatConfig.viewer.border, 2)} color={(color) => {
                                                                        setChatConfig(prevState => ({
                                                                            ...prevState,
                                                                            viewer: {
                                                                                ...prevState.viewer,
                                                                                border: ChangeCssPropertyGroup(prevState.viewer.border, color, 2)
                                                                            }
                                                                        }))
                                                                    }} />
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Radius</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={chatConfig.viewer.borderRadius.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                viewer: {
                                                                                    ...prevState.viewer,
                                                                                    borderRadius: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-center g-3">
                                                                <div className="d-grid gap-2">
                                                                    <button className="btn btn-primary" type="button" onClick={ApplyConfig}>Apply</button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingMessage">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#message" aria-expanded="false" aria-controls="message">
                                                    Message
                                                </button>
                                            </h2>
                                            <div id="message" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="row align-items-center mb-3 g-3">
                                                                <div className="col-md-12">
                                                                    <div style={{ fontSize: "1.3rem", marginBottom: "-10px" }}>Text Option</div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Font Size</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="4" max="100" value={chatConfig.message.fontSize.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    fontSize: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Font Color</label>
                                                                    <InputColorPicker setColor={chatConfig.message.color} color={(color) => {
                                                                        setChatConfig(prevState => ({
                                                                            ...prevState,
                                                                            message: {
                                                                                ...prevState.message,
                                                                                color: color + ' !important'
                                                                            }
                                                                        }))
                                                                    }} />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Background Color</label>
                                                                    <InputColorPicker setColor={chatConfig.message.backgroundColor} color={(color) => {
                                                                        setChatConfig(prevState => ({
                                                                            ...prevState,
                                                                            message: {
                                                                                ...prevState.message,
                                                                                backgroundColor: color + ' !important'
                                                                            }
                                                                        }))
                                                                    }} colorType="rgba" />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Transform</label>
                                                                    <div className="input-group">
                                                                        <select className="form-select" defaultValue="none" onChange={
                                                                            (e) => {
                                                                                setChatConfig(prevState => ({
                                                                                    ...prevState,
                                                                                    message: {
                                                                                        ...prevState.message,
                                                                                        textTransform: e.target.value
                                                                                    }
                                                                                }))
                                                                            }
                                                                        }>
                                                                            <option value="none">None</option>
                                                                            <option value="capitalize">Text Capitalized</option>
                                                                            <option value="uppercase">TEXT UPPERCASE</option>
                                                                            <option value="lowercase">text lowercase</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Italic</label>
                                                                    <div className="input-group">
                                                                        <select className="form-select" defaultValue="normal" onChange={
                                                                            (e) => {
                                                                                setChatConfig(prevState => ({
                                                                                    ...prevState,
                                                                                    message: {
                                                                                        ...prevState.message,
                                                                                        fontStyle: e.target.value
                                                                                    }
                                                                                }))
                                                                            }
                                                                        }>
                                                                            <option value="normal">None</option>
                                                                            <option value="italic">Yes</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Bold</label>
                                                                    <div className="input-group">
                                                                        <select className="form-select" defaultValue="normal" onChange={
                                                                            (e) => {
                                                                                setChatConfig(prevState => ({
                                                                                    ...prevState,
                                                                                    message: {
                                                                                        ...prevState.message,
                                                                                        fontWeight: e.target.value
                                                                                    }
                                                                                }))
                                                                            }
                                                                        }>
                                                                            <option value="normal">None</option>
                                                                            <option value="bold">Yes</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-center mb-3 g-3">
                                                                <div className="col-md-12">
                                                                    <div style={{ fontSize: "1.3rem", marginBottom: "-10px" }}>Padding</div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Left</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={chatConfig.message.paddingLeft.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    paddingLeft: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Top</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={chatConfig.message.paddingTop.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    paddingTop: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Right</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={chatConfig.message.paddingRight.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    paddingRight: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Bottom</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={chatConfig.message.paddingBottom.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    paddingBottom: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-center mb-3 g-3">
                                                                <div className="col-md-12">
                                                                    <div style={{ fontSize: "1.3rem", marginBottom: "-10px" }}>Margin</div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Left</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="-100" max="100" value={chatConfig.message.marginLeft.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    marginLeft: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Top</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="-100" max="100" value={chatConfig.message.marginTop.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    marginTop: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Right</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="-100" max="100" value={chatConfig.message.marginRight.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    marginRight: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Bottom</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="-100" max="100" value={chatConfig.message.marginBottom.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    marginBottom: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-center mb-3 g-3">
                                                                <div className="col-md-12">
                                                                    <div style={{ fontSize: "1.3rem", marginBottom: "-10px" }}>Text Shadow</div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Shift Right</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="-100" max="100" value={GetCssPropertyGroup(chatConfig.message.textShadow, 0).replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    textShadow: ChangeCssPropertyGroup(prevState.message.textShadow, e.target.value + "px", 0)
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Shift Down</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="-100" max="100" value={GetCssPropertyGroup(chatConfig.message.textShadow, 1).replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    textShadow: ChangeCssPropertyGroup(prevState.message.textShadow, e.target.value + "px", 1)
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Blur</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={GetCssPropertyGroup(chatConfig.message.textShadow, 2).replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    textShadow: ChangeCssPropertyGroup(prevState.message.textShadow, e.target.value + "px", 2)
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Color</label>
                                                                    <InputColorPicker colorType="rgba" setColor={GetCssPropertyGroup(chatConfig.message.textShadow, 3)} color={(color) => {
                                                                        setChatConfig(prevState => ({
                                                                            ...prevState,
                                                                            message: {
                                                                                ...prevState.message,
                                                                                textShadow: ChangeCssPropertyGroup(prevState.message.textShadow, color, 3)
                                                                            }
                                                                        }))
                                                                    }} />
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-center mb-3 g-3">
                                                                <div className="col-md-12">
                                                                    <div style={{ fontSize: "1.3rem", marginBottom: "-10px" }}>Box Shadow</div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Shift Right</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="-100" max="100" value={GetCssPropertyGroup(chatConfig.message.boxShadow, 0).replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    boxShadow: ChangeCssPropertyGroup(prevState.message.boxShadow, e.target.value + "px", 0)
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Shift Down</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="-100" max="100" value={GetCssPropertyGroup(chatConfig.message.boxShadow, 1).replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    boxShadow: ChangeCssPropertyGroup(prevState.message.boxShadow, e.target.value + "px", 1)
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label">Blur</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={GetCssPropertyGroup(chatConfig.message.boxShadow, 2).replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    boxShadow: ChangeCssPropertyGroup(prevState.message.boxShadow, e.target.value + "px", 2)
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Spread</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={GetCssPropertyGroup(chatConfig.message.boxShadow, 3).replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    boxShadow: ChangeCssPropertyGroup(prevState.message.boxShadow, e.target.value + "px", 3)
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Color</label>
                                                                    <InputColorPicker colorType="rgba" setColor={GetCssPropertyGroup(chatConfig.message.boxShadow, 4)} color={(color) => {
                                                                        setChatConfig(prevState => ({
                                                                            ...prevState,
                                                                            message: {
                                                                                ...prevState.message,
                                                                                boxShadow: ChangeCssPropertyGroup(prevState.message.boxShadow, color, 4)
                                                                            }
                                                                        }))
                                                                    }} />
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-center mb-3 g-3">
                                                                <div className="col-md-12">
                                                                    <div style={{ fontSize: "1.3rem", marginBottom: "-10px" }}>Border</div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Thickness</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={GetCssPropertyGroup(chatConfig.message.border, 0).replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    border: ChangeCssPropertyGroup(prevState.message.border, e.target.value + "px", 0)
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Style</label>
                                                                    <div className="input-group">
                                                                        <select className="form-select" defaultValue="none" onChange={
                                                                            (e) => {
                                                                                setChatConfig(prevState => ({
                                                                                    ...prevState,
                                                                                    message: {
                                                                                        ...prevState.message,
                                                                                        border: ChangeCssPropertyGroup(prevState.message.border, e.target.value, 1)
                                                                                    }
                                                                                }))
                                                                            }
                                                                        }>
                                                                            <option value="none">none</option>
                                                                            <option value="dotted">Dotted</option>
                                                                            <option value="dashed">Dashed</option>
                                                                            <option value="solid">Solid</option>
                                                                            <option value="double">Double</option>
                                                                            <option value="groove">Groove</option>
                                                                            <option value="ridge">Ridge</option>
                                                                            <option value="inset">Inset</option>
                                                                            <option value="outset">Outset</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Color</label>
                                                                    <InputColorPicker colorType="rgba" setColor={GetCssPropertyGroup(chatConfig.message.border, 2)} color={(color) => {
                                                                        setChatConfig(prevState => ({
                                                                            ...prevState,
                                                                            message: {
                                                                                ...prevState.message,
                                                                                border: ChangeCssPropertyGroup(prevState.message.border, color, 2)
                                                                            }
                                                                        }))
                                                                    }} />
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-label">Radius</label>
                                                                    <div className="input-group">
                                                                        <input type="number" min="0" max="100" value={chatConfig.message.borderRadius.replace(/\D/g, '')} className="form-control" onChange={(e) => {
                                                                            setChatConfig(prevState => ({
                                                                                ...prevState,
                                                                                message: {
                                                                                    ...prevState.message,
                                                                                    borderRadius: e.target.value + 'px'
                                                                                }
                                                                            }))
                                                                        }} /><span className="input-group-text">px</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-center g-3">
                                                                <div className="d-grid gap-2">
                                                                    <button className="btn btn-primary" type="button" onClick={ApplyConfig}>Apply</button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 order-md-2 order-sm-1">
                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <div>
                                        <ul className="nav nav-pills justify-content-center mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button">Preview</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-code-tab" data-bs-toggle="pill" data-bs-target="#pills-code" type="button">Code</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                            <div className="card">
                                                <div className="card-body">
                                                    <iframe title="Livechat Example" src={urlIFrame} style={{ width: "100%", height: "400px", background: bgPreview, borderRadius: "7px" }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-code" role="tabpanel">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className='row'>
                                                        <div className='col-md-12'>
                                                            {
                                                                (isEdited)
                                                                    ?
                                                                    <div>
                                                                        <div className="d-grid gap-2 mb-2">
                                                                            <CopyToClipboard text={renderedCss} onCopy={
                                                                                () => toast("Successfully copied 😻")
                                                                            }>
                                                                                <button className="btn btn-outline-primary" type="button">Copy to clipboard</button>
                                                                            </CopyToClipboard>
                                                                        </div>
                                                                        <SyntaxHighlighter wrapLines={true} showLineNumbers={true} language="css" style={a11yDark}>
                                                                            {renderedCss}
                                                                        </SyntaxHighlighter>
                                                                    </div>
                                                                    : <div className='text-center'>
                                                                        Apply style first to see the code.
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;