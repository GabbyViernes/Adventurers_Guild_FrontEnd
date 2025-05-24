import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function LoginPage(props) {
	const [input1, onChangeInput1] = useState('');
	const [input2, onChangeInput2] = useState('');
	const [input3, onChangeInput3] = useState('');
  	const navigate = useNavigate();
  	const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
	try {
    // await authService.login(credentials);
    navigate('/loading'); // This must be present
  } catch (error) {
    console.error('Login failed:', error);
  }
   
    navigate('/loading'); // Redirect to loading screen
  };

	return (
		<div 
			style={{
				display: "flex",
				flexDirection: "column",
				background: "#FFFFFF",
			}}>
			<div 
				style={{
					height: 1820,
					alignSelf: "stretch",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					
				}}>
				<div 
					style={{
						display: "flex",
						alignItems: "flex-start",
						marginBottom: 50,
						marginLeft: 73,
					}}>
					<div 
						style={{
							flexShrink: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							marginTop: 20,
							marginRight: 170,
						}}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/56tzgjza_expires_30_days.png"} 
							style={{
								width: 87,
								height: 87,
								marginBottom: 60,
								objectFit: "fill",
                                marginLeft: 330,
							}}
						/>
						<div 
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								marginBottom: 70,
								marginLeft: 120,
								marginRight: 120,
							}}>
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/42h41jdl_expires_30_days.png"} 
								style={{
									width: 365,
									height: 26,
									marginBottom: 20,
									objectFit: "fill",
                                    marginLeft: 70,
                                    
								}}
							/>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
                                    marginLeft: 70,
								}} >
								{"Sign up for free!"}
							</span>
						</div>
						<input
							placeholder={"Email"}
							value={input1}
							onChange={(event)=>onChangeInput1(event.target.value)}
							style={{
								color: "#1A120B",
								fontSize: 20,
								marginBottom: 15,
								marginLeft: 5,
								marginRight: 5,
								background: "none",
								borderRadius: 10,
								border: `1px solid #1A120B`,
								padding: 13,
                                width: 700,
							}}
						/>
						<input
							placeholder={"Password"}
							value={input2}
							onChange={(event)=>onChangeInput2(event.target.value)}
							style={{
								color: "#1A120B",
								fontSize: 20,
								marginBottom: 30,
								marginLeft: 5,
								marginRight: 5,
								background: "none",
								borderRadius: 10,
								border: `1px solid #1A120B`,
								padding: 13,
                                width: 700,
							}}
						/>
						<button 
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								background: "#B6B6B6",
								borderRadius: 50,
								border: "none",
								paddingTop: 18,
								paddingBottom: 18,
								paddingLeft: 256,
								paddingRight: 256,
								marginBottom: 40,
								marginLeft: 5,
								marginRight: 5,
								textAlign: "left",
                                width: 700,
							}}
							onClick={()=>navigate("/MainSI")}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
                                    marginLeft: 70,
								}} >
								{"Continue"}
							</span>
						</button>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								marginBottom: 40,
							}}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"OR"}
							</span>
						</div>
						<button 
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								background: "#3C2A21E3",
								borderRadius: 50,
								border: "none",
								paddingTop: 18,
								paddingBottom: 18,
								paddingLeft: 206,
								paddingRight: 206,
								marginBottom: 15,
								marginLeft: 5,
								marginRight: 5,
						
                                width: 700,
                                textAlign: "center",
							}}
							onClick={()=>navigate("/signup")}>
							<span 
								style={{
									color: "#F6F6F6",
									fontSize: 16,
                                    marginLeft: 70,
								}} >
								{"Create New Account"}
							</span>
						</button>
						<button 
							style={{
								display: "flex",
								alignItems: "center",
								background: "none",
								borderRadius: 50,
								border: `1px solid #1A120B`,
								paddingTop: 16,
								paddingBottom: 16,
								paddingLeft: 218,
								paddingRight: 218,
								marginBottom: 15,
								marginLeft: 5,
								marginRight: 5,
								textAlign: "left",
                                width: 700,
							}}
							onClick={()=>alert("Pressed!")}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
									fontWeight: "bold",
									marginRight: 10,
                                    marginLeft: 58,
								}} >
								{"Sign up with"}
							</span>
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/00fmhnbs_expires_30_days.png"} 
								style={{
									width: 46,
									height: 23,
									objectFit: "fill",
								}}
							/>
						</button>
						<button 
							style={{
								display: "flex",
								alignItems: "center",
								background: "none",
								borderRadius: 50,
								border: `1px solid #1A120B`,
								paddingTop: 16,
								paddingBottom: 16,
								paddingLeft: 218,
								paddingRight: 218,
								marginBottom: 30,
								marginLeft: 5,
								marginRight: 5,
								textAlign: "left",
                                width: 700,
							}}
							onClick={()=>alert("Pressed!")}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
									fontWeight: "bold",
									marginRight: 10,
                                    marginLeft: 58,
								}} >
								{"Sign up with"}
							</span>
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/ss20qpdg_expires_30_days.png"} 
								style={{
									width: 45,
									height: 23,
									objectFit: "fill",
								}}
							/>
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
						src={"dnd__morning_at_human_city__by_bergionstyle_dg4v4aa-fullview.jpg"} 
						style={{
							width: 865,
							height: 1000,
							objectFit: "fill",
                            marginLeft: 70,
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
							display: "flex",
							flexDirection: "column",
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
						<input
							placeholder={"YOUR EMAIL"}
							value={input3}
							onChange={(event)=>onChangeInput3(event.target.value)}
							style={{
								color: "#1A120B",
								fontSize: 20,
								alignSelf: "stretch",
								background: "#E5E5CB",
								borderRadius: 50,
								border: "none",
								paddingTop: 33,
								paddingBottom: 33,
								paddingLeft: 40,
								paddingRight: 80,
							}}
						/>
					</div>
				</div>
				<img
					src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/tzmlqmew_expires_30_days.png"} 
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