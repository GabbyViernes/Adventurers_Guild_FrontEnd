import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
export default (props) => {
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
					height: 2140,
					alignSelf: "stretch",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					background: "#F6F6F6",
				}}>
				<div 
					style={{
						display: "flex",
						alignItems: "flex-start",
						marginBottom: 69,
						marginLeft: 73,
					}}>
					<div 
						style={{
							flexShrink: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							marginTop: 20,
							marginRight: 47,
						}}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/aiy2q2go_expires_30_days.png"} 
							style={{
								width: 87,
								height: 87,
								marginBottom: 60,
								objectFit: "fill",
                                marginLeft: 250,
							}}
						/>
						<div 
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								marginBottom: 40,
								marginLeft: 120,
								marginRight: 300,
							}}>
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/ejj4rh8o_expires_30_days.png"} 
								style={{
									width: 365,
									height: 26,
									marginBottom: 20,
									objectFit: "fill",
								}}
							/>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Sign up for free!"}
							</span>
						</div>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 20,
								fontWeight: "bold",
								marginBottom: 15,
								marginLeft: 5,
							}} >
							{"Adventurer Info"}
						</span>
						<div 
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								marginBottom: 40,
								marginLeft: 5,
								marginRight: 5,
							}}>
							<input
								placeholder={"Email"}
								value={input1}
								onChange={(event)=>onChangeInput1(event.target.value)}
								style={{
									color: "#1A120B",
									fontSize: 20,
									marginBottom: 20,
									background: "none",
									borderRadius: 4,
									border: `1px solid #1A120B`,
									padding: 13,
                                    width: 596,
								}}
							/>
							<div 
								style={{
									display: "flex",
									alignItems: "flex-start",
									paddingRight: 2,
									marginBottom: 20,
								}}>
								<input
									placeholder={"Name"}
									value={input2}
									onChange={(event)=>onChangeInput2(event.target.value)}
									style={{
										color: "#1A120B",
										fontSize: 20,
										marginRight: 25,
										flexShrink: 0,
										background: "none",
										borderRadius: 4,
										border: `1px solid #1A120B`,
										padding: 13,
                                        width: 284,
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
                                        width: 284,
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
									background: "none",
									borderRadius: 4,
									border: `1px solid #1A120B`,
									padding: 13,
                                    width: 596,
								}}
							/>
						</div>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 20,
								fontWeight: "bold",
								marginBottom: 10,
								marginLeft: 5,
							}} >
							{"Adventurer Skills"}
						</span>
						<div 
							style={{
								display: "flex",
								alignItems: "flex-start",
								marginBottom: 10,
								marginLeft: 5,
							}}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
									marginRight: 242,
								}} >
								{"Main Skills"}
							</span>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Primary Skills"}
							</span>
						</div>
						<div 
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								marginBottom: 20,
								marginLeft: 5,
								marginRight: 5,
							}}>
							<div 
								style={{
									display: "flex",
									alignItems: "flex-start",
									paddingRight: 1,
									marginBottom: 10,
								}}>
								<div 
									style={{
										width: 284,
										height: 50,
										borderRadius: 4,
										border: `1px solid #1A120B`,
										marginRight: 25,
									}}>
								</div>
								<div 
									style={{
										width: 284,
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
									paddingRight: 1,
									marginBottom: 10,
								}}>
								<div 
									style={{
										width: 284,
										height: 50,
										borderRadius: 4,
										border: `1px solid #1A120B`,
										marginRight: 25,
									}}>
								</div>
								<div 
									style={{
										width: 284,
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
									paddingRight: 1,
								}}>
								<div 
									style={{
										width: 284,
										height: 50,
										borderRadius: 4,
										border: `1px solid #1A120B`,
										marginRight: 25,
									}}>
								</div>
								<div 
									style={{
										width: 284,
										height: 50,
										borderRadius: 4,
										border: `1px solid #1A120B`,
									}}>
								</div>
							</div>
						</div>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 16,
								marginBottom: 10,
								marginLeft: 5,
							}} >
							{"Miscellaneous Skills"}
						</span>
						<div 
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								marginBottom: 75,
								marginLeft: 5,
								marginRight: 5,
							}}>
							<div 
								style={{
									display: "flex",
									alignItems: "flex-start",
									paddingRight: 1,
									marginBottom: 10,
								}}>
								<div 
									style={{
										width: 284,
										height: 50,
										borderRadius: 4,
										border: `1px solid #1A120B`,
										marginRight: 25,
									}}>
								</div>
								<div 
									style={{
										width: 284,
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
									paddingRight: 1,
									marginBottom: 10,
								}}>
								<div 
									style={{
										width: 284,
										height: 50,
										borderRadius: 4,
										border: `1px solid #1A120B`,
										marginRight: 25,
									}}>
								</div>
								<div 
									style={{
										width: 284,
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
									paddingRight: 1,
								}}>
								<div 
									style={{
										width: 284,
										height: 50,
										borderRadius: 4,
										border: `1px solid #1A120B`,
										marginRight: 25,
									}}>
								</div>
								<div 
									style={{
										width: 284,
										height: 50,
										borderRadius: 4,
										border: `1px solid #1A120B`,
									}}>
								</div>
							</div>
						</div>
						<button 
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								background: "#3C2A21",
								borderRadius: 50,
								border: "none",
								paddingTop: 18,
								paddingBottom: 18,
								paddingLeft: 226,
								paddingRight: 226,
								marginBottom: 30,
								marginLeft: 5,
								marginRight: 5,
								textAlign: "left",
							}}
							onClick={()=>navigate("/login")}>
							<span 
								style={{
									color: "#F6F6F6",
									fontSize: 16,
								}} >
								{"Create Account"}
							</span>
						</button>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 16,
								textAlign: "center",
								marginLeft: 5,
								marginRight: 5,
								width: 595,
							}} >
							{"By clicking Create account, you agree to the Guild’s privacy notice, T&Cs and to receive offers, news, and updates"}
						</span>
					</div>
					<img
						src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/9qhizj7h_expires_30_days.png"} 
						style={{
							width: 1020,
							height: 1822,
							objectFit: "fill",
						}}
					/>
				</div>
				<div 
					style={{
						height: 1,
						alignSelf: "stretch",
						background: "#1A120B",
						marginBottom: 124,
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
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/ft76opqt_expires_30_days.png"} 
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
					src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/mmi8p3mh_expires_30_days.png"} 
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
						marginBottom: 30,
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