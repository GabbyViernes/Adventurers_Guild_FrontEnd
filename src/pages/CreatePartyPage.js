import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
export default function CreatePartyPage(props)  {
	const [input1, onChangeInput1] = useState('');
	const [input2, onChangeInput2] = useState('');
	const [input3, onChangeInput3] = useState('');
	const [input4, onChangeInput4] = useState('');
	const [input5, onChangeInput5] = useState('');
    const navigate = useNavigate();
	return (
		<div 
			style={{
				display: "flex",
				flexDirection: "column",
				background: "#FFFFFF",
			}}>
			<div 
				style={{
					height: 2111,
					alignSelf: "stretch",
					display: "flex",
					flexDirection: "column",
					background: "#F6F6F6",
				}}>
				<div 
					style={{
						alignSelf: "stretch",
						display: "flex",
						alignItems: "flex-start",
						paddingLeft: 40,
						paddingRight: 40,
						marginBottom: 13,
					}}>
					<span 
						style={{
							color: "#1A120B",
							fontSize: 16,
							marginTop: 58,
							marginRight: 32,
						}} >
						{"Join Party"}
					</span>
					<span 
						style={{
							color: "#1A120B",
							fontSize: 16,
							marginTop: 58,
							marginRight: 40,
						}} >
						{"Quests"}
					</span>
					<span 
						style={{
							color: "#1A120B",
							fontSize: 16,
							marginTop: 58,
							marginRight: 40,
						}} >
						{"Vault"}
					</span>
					<span 
						style={{
							color: "#1A120B",
							fontSize: 16,
							marginTop: 58,
							marginRight: 249,
						}} >
						{"Inventory"}
					</span>
					<img
						src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/teullewi_expires_30_days.png"} 
						style={{
							width: 87,
							height: 87,
							marginTop: 20,
							objectFit: "fill",
                            marginLeft: 300,
						}}
					/>
					<div 
						style={{
							flex: 1,
							alignSelf: "stretch",
						}}>
					</div>
					<span 
						style={{
							color: "#1A120B",
							fontSize: 16,
							marginTop: 58,
							marginRight: 64,
						}} >
						{"NEWS"}
					</span>
					<button 
						style={{
							flexShrink: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							background: "#3C2A21",
							borderRadius: 50,
							border: "none",
							paddingTop: 18,
							paddingBottom: 18,
							paddingLeft: 35,
							paddingRight: 35,
							marginTop: 40,
							textAlign: "left",
						}}
						onClick={()=>navigate("/profile")}>
						<span 
							style={{
								color: "#F6F6F6",
								fontSize: 16,
							}} >
							{"Profile"}
						</span>
					</button>
				</div>
				<div 
					style={{
						alignSelf: "stretch",
						display: "flex",
						alignItems: "flex-start",
						marginBottom: 50,
						marginLeft: 40,
						marginRight: 40,
					}}>
					<div 
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							marginRight: 12,
						}}>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 80,
								marginBottom: 60,
							}} >
							{"Create Party"}
						</span>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 20,
								fontWeight: "bold",
								marginBottom: 15,
								marginLeft: 38,
							}} >
							{"Party Info"}
						</span>
						<input
							placeholder={"Party Name"}
							value={input1}
							onChange={(event)=>onChangeInput1(event.target.value)}
							style={{
								color: "#1A120B",
								fontSize: 20,
								marginBottom: 20,
								marginLeft: 38,
								alignSelf: "stretch",
								background: "none",
								borderRadius: 4,
								border: `1px solid #1A120B`,
								paddingTop: 13,
								paddingBottom: 13,
								paddingLeft: 13,
								paddingRight: 26,
                                marginRight: 70,
                                width: 800,
							}}
						/>
						<div 
							style={{
								display: "flex",
								alignItems: "flex-start",
								marginBottom: 20,
								marginLeft: 38,
							}}>
							<input
								placeholder={"Party Leader Name"}
								value={input2}
								onChange={(event)=>onChangeInput2(event.target.value)}
								style={{
									color: "#1A120B",
									fontSize: 20,
									marginRight: 10,
									flexShrink: 0,
									background: "none",
									borderRadius: 4,
									border: `1px solid #1A120B`,
									padding: 13,
                                    width: 390,
								}}
							/>
							<input
								placeholder={"Class"}
								value={input3}
								onChange={(event)=>onChangeInput3(event.target.value)}
								style={{
									color: "#1A120B",
									fontSize: 20,
									flexShrink: 0,
									background: "none",
									borderRadius: 4,
									border: `1px solid #1A120B`,
									paddingTop: 13,
									paddingBottom: 13,
									paddingLeft: 14,
									paddingRight: 14,
                                    width: 400,
								}}
							/>
						</div>
						<input
							placeholder={"Rank: (Default) E-Rank"}
							value={input4}
							onChange={(event)=>onChangeInput4(event.target.value)}
							style={{
								color: "#1A120B",
								fontSize: 20,
								marginBottom: 52,
								marginLeft: 38,
								alignSelf: "stretch",
								background: "none",
								borderRadius: 4,
								border: `1px solid #1A120B`,
								paddingTop: 13,
								paddingBottom: 13,
								paddingLeft: 13,
								paddingRight: 26,
                                width: 800,
							}}
						/>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 20,
								fontWeight: "bold",
								marginBottom: 10,
								marginLeft: 38,
							}} >
							{"Party Members"}
						</span>
						<div 
							style={{
								display: "flex",
								alignItems: "flex-start",
								marginBottom: 10,
								marginLeft: 38,
							}}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
									marginRight: 350,
								}} >
								{"Frontline"}
							</span>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Supports"}
							</span>
						</div>
						<div 
							style={{
								display: "flex",
								alignItems: "flex-start",
								marginBottom: 10,
								marginLeft: 38,
							}}>
							<div 
								style={{
									width: 384,
									height: 50,
									borderRadius: 4,
									border: `1px solid #1A120B`,
									marginRight: 26,
								}}>
							</div>
							<div 
								style={{
									width: 384,
									height: 50,
									borderRadius: 4,
									border: `1px solid #1A120B`,
								}}>
							</div>
						</div>
						<div 
							style={{
								display: "flex",
								alignItems: "flex-start",
								marginBottom: 10,
								marginLeft: 38,
							}}>
							<div 
								style={{
									width: 384,
									height: 50,
									borderRadius: 4,
									border: `1px solid #1A120B`,
									marginRight: 26,
								}}>
							</div>
							<div 
								style={{
									width: 384,
									height: 50,
									borderRadius: 4,
									border: `1px solid #1A120B`,
								}}>
							</div>
						</div>
						<div 
							style={{
								display: "flex",
								alignItems: "flex-start",
								marginBottom: 20,
								marginLeft: 38,
							}}>
							<div 
								style={{
									width: 384,
									height: 50,
									borderRadius: 4,
									border: `1px solid #1A120B`,
									marginRight: 26,
								}}>
							</div>
							<div 
								style={{
									width: 384,
									height: 50,
									borderRadius: 4,
									border: `1px solid #1A120B`,
								}}>
							</div>
						</div>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 16,
								marginBottom: 10,
								marginLeft: 38,
							}} >
							{"Damage Dealers"}
						</span>
						<div 
							style={{
								display: "flex",
								alignItems: "flex-start",
								marginBottom: 10,
								marginLeft: 38,
							}}>
							<div 
								style={{
									width: 384,
									height: 50,
									borderRadius: 4,
									border: `1px solid #1A120B`,
									marginRight: 26,
								}}>
							</div>
							<div 
								style={{
									width: 384,
									height: 50,
									borderRadius: 4,
									border: `1px solid #1A120B`,
								}}>
							</div>
						</div>
						<div 
							style={{
								display: "flex",
								alignItems: "flex-start",
								marginBottom: 10,
								marginLeft: 38,
							}}>
							<div 
								style={{
									width: 384,
									height: 50,
									borderRadius: 4,
									border: `1px solid #1A120B`,
									marginRight: 26,
								}}>
							</div>
							<div 
								style={{
									width: 384,
									height: 50,
									borderRadius: 4,
									border: `1px solid #1A120B`,
								}}>
							</div>
						</div>
						<div 
							style={{
								display: "flex",
								alignItems: "flex-start",
								marginBottom: 52,
								marginLeft: 38,
							}}>
							<div 
								style={{
									width: 384,
									height: 50,
									borderRadius: 4,
									border: `1px solid #1A120B`,
									marginRight: 26,
								}}>
							</div>
							<div 
								style={{
									width: 384,
									height: 50,
									borderRadius: 4,
									border: `1px solid #1A120B`,
								}}>
							</div>
						</div>
						<button 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								background: "#3C2A21E3",
								borderRadius: 50,
								border: "none",
								paddingTop: 18,
								paddingBottom: 18,
								marginBottom: 24,
								marginLeft: 38,
								textAlign: "left",
                                width: 800,
							}}
							onClick={()=>navigate("/MainSI")}>
							<span 
								style={{
									color: "#F6F6F6",
									fontSize: 16,
								}} >
								{"Create Party"}
							</span>
						</button>
						<button 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								background: "#B6B6B6",
								borderRadius: 50,
								border: "none",
								paddingTop: 18,
								paddingBottom: 18,
								marginLeft: 38,
								textAlign: "left",
                                width: 800,
							}}
							onClick={()=>navigate("/MainSI")}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Cancel"}
							</span>
						</button>
					</div>
					<img
						src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/b1opppst_expires_30_days.png"} 
						style={{
							width: 890,
							height: 1333,
							marginTop: 60,
							objectFit: "fill",
						}}
					/>
				</div>
				<div 
					style={{
						height: 1,
						alignSelf: "stretch",
						background: "#1A120B",
						marginBottom: 109,
						marginLeft: 40,
						marginRight: 40,
					}}>
				</div>
				<div 
					style={{
						alignSelf: "stretch",
						display: "flex",
						alignItems: "flex-start",
						marginBottom: 86,
						marginLeft: 40,
						marginRight: 40,
					}}>
					<span 
						style={{
							color: "#1A120B",
							fontSize: 32,
							fontWeight: "bold",
							marginRight: 178,
						}} >
						{"ADVENTURER’S GUILD"}
					</span>
					<div 
						style={{
							flexShrink: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							marginRight: 252,
						}}>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 20,
								fontWeight: "bold",
								marginBottom: 4,
							}} >
							{"HOME"}
						</span>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 20,
								fontWeight: "bold",
								marginBottom: 4,
							}} >
							{"PARTY"}
						</span>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 20,
								fontWeight: "bold",
								marginBottom: 4,
							}} >
							{"QUESTS"}
						</span>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 20,
								fontWeight: "bold",
								marginBottom: 4,
							}} >
							{"VAULT"}
						</span>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 20,
								fontWeight: "bold",
							}} >
							{"CONTACT"}
						</span>
					</div>
					<div 
						style={{
							flex: 1,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								alignItems: "center",
								marginBottom: 22,
							}}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 28,
									fontWeight: "bold",
									marginRight: 48,
								}} >
								{"SIGN UP"}
							</span>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 28,
									fontWeight: "bold",
									marginRight: 47,
								}} >
								{"TO OUR"}
							</span>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 28,
									fontWeight: "bold",
									flex: 1,
								}} >
								{"NEWSLETTER"}
							</span>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								alignItems: "center",
								background: "#E5E5CB",
								borderRadius: 50,
								paddingTop: 10,
								paddingBottom: 10,
								paddingLeft: 40,
								paddingRight: 10,
							}}>
							<input
								placeholder={"YOUR EMAIL"}
								value={input5}
								onChange={(event)=>onChangeInput5(event.target.value)}
								style={{
									color: "#1A120B",
									fontSize: 20,
									flex: 1,
									alignSelf: "stretch",
									background: "none",
									border: "none",
									paddingTop: 23,
									paddingBottom: 23,
								}}
							/>
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/v7prinvm_expires_30_days.png"} 
								style={{
									width: 60,
									height: 60,
									objectFit: "fill",
								}}
							/>
						</div>
					</div>
				</div>
				<img
					src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/r1krfpne_expires_30_days.png"} 
					style={{
						height: 308,
						marginBottom: 130,
						marginLeft: 40,
						marginRight: 40,
						alignSelf: "stretch",
						objectFit: "fill",
					}}
				/>
				<div 
					style={{
						alignSelf: "stretch",
						display: "flex",
						alignItems: "flex-start",
						marginBottom: 44,
						marginLeft: 40,
						marginRight: 40,
					}}>
					<span 
						style={{
							color: "#1A120B",
							fontSize: 12,
							fontWeight: "bold",
							marginRight: 374,
							width: 144,
						}} >
						{"© ADVENTURER’S GUILD/\nALL RIGHTS RESERVED"}
					</span>
					<span 
						style={{
							color: "#1A120B",
							fontSize: 12,
							fontWeight: "bold",
							flex: 1,
						}} >
						{"TERMS AND CONDITIONS"}
					</span>
					<div 
						style={{
							flexShrink: 0,
							display: "flex",
							alignItems: "center",
							paddingRight: 3,
						}}>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 12,
								fontWeight: "bold",
								marginRight: 89,
							}} >
							{"FACEBOOK"}
						</span>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 12,
								fontWeight: "bold",
							}} >
							{"INSTAGRAM"}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}