import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function ProfilePage(props)  {
	const [input1, onChangeInput1] = useState('');
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
					height: 2319,
					alignSelf: "stretch",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
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
					 <Link 
    to="/party"
    style={{
      textDecoration: 'none',
      marginRight: 32,
	  marginTop: 58,
    }}
  >
    <span style={{
      color: "#1A120B",
      fontSize: 16,
      cursor: 'pointer',
      transition: 'color 0.3s',
    }}>
      {"Join Party"}
    </span>
  </Link>

  <Link 
    to="/quests"
    style={{
      textDecoration: 'none',
      marginRight: 40,
	  marginTop: 58,
    }}
  >
    <span style={{
      color: "#1A120B",
      fontSize: 16,
      cursor: 'pointer',
      transition: 'color 0.3s',
    }}>
      {"Quests"}
    </span>
  </Link>

  <Link 
    to="/vault"
    style={{
      textDecoration: 'none',
      marginRight: 40,
	  marginTop: 58,
    }}
  >
    <span style={{
      color: "#1A120B",
      fontSize: 16,
      cursor: 'pointer',
      transition: 'color 0.3s',
    }}>
      {"Vault"}
    </span>
  </Link>
					<span 
						style={{
							color: "#1A120B",
							fontSize: 16,
							marginTop: 58,
							marginRight: 249,
						}} >
						{"Inventory"}
					</span>
					<Link
										to="/MainSI">
										<img
											src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/2lvzpgcl_expires_30_days.png"} 
											style={{
												width: 87,
												height: 87,
												objectFit: "fill",
												marginLeft: 250,
												marginTop: 30,
											}}
										/></Link>
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
  onClick={() => navigate("/login")}>
  <span 
    style={{
      color: "#F6F6F6",
      fontSize: 16,
    }} >
    {"Logout"} 
  </span>
</button>
				</div>
				<span 
					style={{
						fontFamily: "'Cloister Black', serif",
						color: "#1A120B",
						fontSize: 100,
						marginBottom: 60,
						marginLeft: 40,
					}} >
					{"My Account"}
				</span>
				<div 
					style={{
						display: "flex",
						alignItems: "flex-start",
						marginBottom: 100,
						marginLeft: 40,
					}}>
					<img
						src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/0vqzus6n_expires_30_days.png"} 
						style={{
							width: 520,
							height: 1097,
							marginRight: 300,
							objectFit: "fill",
							marginLeft: 40,
						}}
						
					/>
				
					<div 
						style={{
							flexShrink: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
						}}>
						<span 
							style={{
								color: "#000000",
								fontSize: 24,
								fontWeight: "bold",
								marginBottom: 20,
							}} >
							{"Profile picture"}
						</span>
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
								paddingLeft: 26,
								paddingRight: 26,
								marginBottom: 80,
								textAlign: "left",
							}}
							onClick={()=>alert("Pressed!")}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Change Profile"}
							</span>
						</button>
						<span 
							style={{
								color: "#000000",
								fontSize: 24,
								fontWeight: "bold",
								marginBottom: 32,
							}} >
							{"Account Info"}
						</span>
						<div 
							style={{
								display: "flex",
								alignItems: "center",
								paddingRight: 3,
								marginBottom: 16,
							}}>
							<span 
								style={{
									color: "#000000",
									fontSize: 16,
									fontWeight: "bold",
									marginRight: 405,
								}} >
								{"Name"}
							</span>
							<span 
								style={{
									color: "#000000",
									fontSize: 16,
								}} >
								{"Halueth"}
							</span>
						</div>
						<div 
							style={{
								display: "flex",
								alignItems: "center",
								paddingRight: 2,
								marginBottom: 16,
							}}>
							<span 
								style={{
									color: "#000000",
									fontSize: 16,
									fontWeight: "bold",
									marginRight: 289,
								}} >
								{"Email"}
							</span>
							<span 
								style={{
									color: "#000000",
									fontSize: 16,
								}} >
								{"halueth.rogue@advg.com"}
							</span>
						</div>
						<div 
							style={{
								display: "flex",
								alignItems: "center",
								paddingRight: 2,
								marginBottom: 16,
							}}>
							<span 
								style={{
									color: "#000000",
									fontSize: 16,
									fontWeight: "bold",
									marginRight: 416,
								}} >
								{"Class"}
							</span>
							<span 
								style={{
									color: "#000000",
									fontSize: 16,
								}} >
								{"Rogue"}
							</span>
						</div>
						<div 
							style={{
								display: "flex",
								alignItems: "center",
								paddingRight: 1,
								marginBottom: 40,
							}}>
							<span 
								style={{
									color: "#000000",
									fontSize: 16,
									fontWeight: "bold",
									marginRight: 453,
								}} >
								{"Rank"}
							</span>
							<span 
								style={{
									color: "#000000",
									fontSize: 16,
								}} >
								{"A"}
							</span>
						</div>
						<span 
							style={{
								color: "#000000",
								fontSize: 24,
								fontWeight: "bold",
								marginBottom: 32,
							}} >
							{"Skills"}
						</span>
						<div 
							style={{
								display: "flex",
								alignItems: "center",
								paddingRight: 3,
								marginBottom: 16,
							}}>
							<span 
								style={{
									color: "#000000",
									fontSize: 16,
									fontWeight: "bold",
									marginRight: 237,
								}} >
								{"Main Skills"}
							</span>
							<span 
								style={{
									color: "#000000",
									fontSize: 16,
								}} >
								{"Illusion, Lockpicking, Stealth"}
							</span>
						</div>
						<div 
							style={{
								display: "flex",
								alignItems: "center",
								paddingRight: 2,
								marginBottom: 16,
							}}>
							<span 
								style={{
									color: "#000000",
									fontSize: 16,
									fontWeight: "bold",
									marginRight: 141,
								}} >
								{"Primary Skills"}
							</span>
							<span 
								style={{
									color: "#000000",
									fontSize: 16,
								}} >
								{"Short Blade, Mysticism, Critical Striking"}
							</span>
						</div>
						<div 
							style={{
								display: "flex",
								alignItems: "flex-start",
								paddingRight: 3,
								marginBottom: 40,
							}}>
							<span 
								style={{
									color: "#000000",
									fontSize: 16,
									fontWeight: "bold",
									marginRight: 121,
								}} >
								{"Miscellaneous Skills"}
							</span>
							<span 
								style={{
									color: "#000000",
									fontSize: 16,
									textAlign: "right",
									width: 237,
								}} >
								{"Restoration, Streetwise, Mercantile,\nEtiquette, Dodging, Destruction"}
							</span>
						</div>
						<span 
							style={{
								color: "#000000",
								fontSize: 24,
								fontWeight: "bold",
								marginBottom: 32,
							}} >
							{"Inventory"}
						</span>
						<div 
							style={{
								display: "flex",
								alignItems: "flex-start",
								marginBottom: 20,
							}}>
							<div 
								style={{
									width: 153,
									height: 153,
									background: "#D9D9D9",
									marginRight: 20,
								}}>
							</div>
							<div 
								style={{
									width: 152,
									height: 153,
									background: "#D9D9D9",
									marginRight: 20,
								}}>
							</div>
							<div 
								style={{
									width: 153,
									height: 153,
									background: "#D9D9D9",
								}}>
							</div>
						</div>
						<div 
							style={{
								display: "flex",
								alignItems: "flex-start",
								marginBottom: 20,
							}}>
							<div 
								style={{
									width: 153,
									height: 153,
									background: "#D9D9D9",
									marginRight: 20,
								}}>
							</div>
							<div 
								style={{
									width: 152,
									height: 153,
									background: "#D9D9D9",
									marginRight: 20,
								}}>
							</div>
							<div 
								style={{
									width: 153,
									height: 153,
									background: "#D9D9D9",
								}}>
							</div>
						</div>
						<div 
							style={{
								display: "flex",
								alignItems: "flex-start",
							}}>
							<div 
								style={{
									width: 153,
									height: 153,
									background: "#D9D9D9",
									marginRight: 20,
								}}>
							</div>
							<div 
								style={{
									width: 152,
									height: 153,
									background: "#D9D9D9",
									marginRight: 20,
								}}>
							</div>
							<div 
								style={{
									width: 153,
									height: 153,
									background: "#D9D9D9",
								}}>
							</div>
						</div>
					</div>
				</div>
				<div 
					style={{
						height: 1,
						alignSelf: "stretch",
						background: "#000000",
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
								value={input1}
								onChange={(event)=>onChangeInput1(event.target.value)}
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
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/a6kx2wzj_expires_30_days.png"} 
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
					src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/8ff6gph5_expires_30_days.png"} 
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