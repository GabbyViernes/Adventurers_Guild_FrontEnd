import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function PartyPage(props)  {
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
					height: 3548,
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
					<img
						src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/9myc4owp_expires_30_days.png"} 
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
						onClick={()=>alert("Pressed!")}>
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
						marginBottom: 40,
						marginLeft: 40,
						marginRight: 40,
					}}>
					<span 
						style={{
							color: "#1A120B",
							fontSize: 80,
							flex: 1,
						}} >
						{"Party"}
					</span>
					<button 
						style={{
							flexShrink: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							background: "#B6B6B6",
							borderRadius: 50,
							border: "none",
							paddingTop: 16,
							paddingBottom: 16,
							paddingLeft: 15,
							paddingRight: 15,
							marginTop: 34,
							marginRight: 40,
							textAlign: "left",
						}}
						onClick={()=>alert("Pressed!")}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/m42x2z2b_expires_30_days.png"} 
							style={{
								width: 21,
								height: 18,
								objectFit: "fill",
							}}
						/>
					</button>
					<button 
						style={{
							flexShrink: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							background: "#B6B6B6",
							borderRadius: 50,
							border: "none",
							paddingTop: 18,
							paddingBottom: 18,
							paddingLeft: 36,
							paddingRight: 36,
							marginTop: 34,
							textAlign: "left",
						}}
						onClick={()=>navigate("/createparty")}>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 20,
								fontWeight: "bold",
							}} >
							{"Create Party"}
						</span>
					</button>
				</div>
				<div 
					style={{
						alignSelf: "stretch",
						display: "flex",
						alignItems: "flex-start",
						marginBottom: 60,
						marginLeft: 40,
						marginRight: 40,
					}}>
					<div 
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							marginRight: 12,
						}}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/l0ty4kb2_expires_30_days.png"} 
							style={{
								height: 469,
								marginBottom: 15,
								alignSelf: "stretch",
								objectFit: "fill",
							}}
						/>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								marginBottom: 15,
							}}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 32,
									marginBottom: 15,
								}} >
								{"The Ironfang Company"}
							</span>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"A band of seasoned warriors and cunning rogues, known for their fearless approach to battle."}
							</span>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									alignItems: "flex-start",
									marginBottom: 14,
									marginLeft: 5,
									marginRight: 5,
								}}>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
										marginTop: 23,
										flex: 1,
									}} >
									{"Party : 6/8"}
								</span>
								<button 
									style={{
										flexShrink: 0,
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-start",
										background: "#D5CEA3",
										borderRadius: 50,
										border: "none",
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 50,
										paddingRight: 50,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Join Party"}
									</span>
								</button>
							</div>
							<div 
								style={{
									height: 1,
									alignSelf: "stretch",
									background: "#1A120B",
								}}>
							</div>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							marginRight: 12,
						}}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/a5jdwcsi_expires_30_days.png"} 
							style={{
								height: 469,
								marginBottom: 15,
								alignSelf: "stretch",
								objectFit: "fill",
							}}
						/>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								marginBottom: 15,
							}}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 32,
									marginBottom: 15,
								}} >
								{"The Emberborn Vanguard"}
							</span>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"A fire-forged company of knights and battle mages who charge headfirst into danger."}
							</span>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									alignItems: "flex-start",
									marginBottom: 14,
									marginLeft: 5,
									marginRight: 5,
								}}>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
										marginTop: 23,
										flex: 1,
									}} >
									{"Party : 4/6"}
								</span>
								<button 
									style={{
										flexShrink: 0,
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-start",
										background: "#D5CEA3",
										borderRadius: 50,
										border: "none",
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 50,
										paddingRight: 50,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Join Party"}
									</span>
								</button>
							</div>
							<div 
								style={{
									height: 1,
									alignSelf: "stretch",
									background: "#1A120B",
								}}>
							</div>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
						}}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/qq9nmip9_expires_30_days.png"} 
							style={{
								height: 469,
								marginBottom: 15,
								alignSelf: "stretch",
								objectFit: "fill",
							}}
						/>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								marginBottom: 15,
							}}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 32,
									marginBottom: 15,
								}} >
								{"The Gilded Talons"}
							</span>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Treasure hunters and relic raiders with a flair for riches and the thrill of danger."}
							</span>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									alignItems: "flex-start",
									marginBottom: 14,
									marginLeft: 5,
									marginRight: 5,
								}}>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
										marginTop: 23,
										flex: 1,
									}} >
									{"Party : 3/5"}
								</span>
								<button 
									style={{
										flexShrink: 0,
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-start",
										background: "#D5CEA3",
										borderRadius: 50,
										border: "none",
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 50,
										paddingRight: 50,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Join Party"}
									</span>
								</button>
							</div>
							<div 
								style={{
									height: 1,
									alignSelf: "stretch",
									background: "#1A120B",
								}}>
							</div>
						</div>
					</div>
				</div>
				<div 
					style={{
						alignSelf: "stretch",
						display: "flex",
						alignItems: "flex-start",
						marginBottom: 60,
						marginLeft: 40,
						marginRight: 40,
					}}>
					<div 
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							marginRight: 12,
						}}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/7rzzc9dw_expires_30_days.png"} 
							style={{
								height: 469,
								marginBottom: 15,
								alignSelf: "stretch",
								objectFit: "fill",
							}}
						/>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								marginBottom: 15,
							}}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 32,
									marginBottom: 15,
								}} >
								{"The Emberhearts"}
							</span>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"A band of daring explorers and monster slayers who brave the wilds for coin and glory."}
							</span>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									alignItems: "flex-start",
									marginBottom: 14,
									marginLeft: 5,
									marginRight: 5,
								}}>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
										marginTop: 23,
										flex: 1,
									}} >
									{"Party : 5/8"}
								</span>
								<button 
									style={{
										flexShrink: 0,
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-start",
										background: "#D5CEA3",
										borderRadius: 50,
										border: "none",
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 50,
										paddingRight: 50,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Join Party"}
									</span>
								</button>
							</div>
							<div 
								style={{
									height: 1,
									alignSelf: "stretch",
									background: "#1A120B",
								}}>
							</div>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							marginRight: 12,
						}}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/wtzwf99d_expires_30_days.png"} 
							style={{
								height: 469,
								marginBottom: 15,
								alignSelf: "stretch",
								objectFit: "fill",
							}}
						/>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								marginBottom: 15,
							}}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 32,
									marginBottom: 15,
								}} >
								{"The Crimson Vale"}
							</span>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Known for their ruthlessness and elegance, this group specializes in high-risk, high-reward contracts."}
							</span>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									alignItems: "flex-start",
									marginBottom: 14,
									marginLeft: 5,
									marginRight: 5,
								}}>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
										marginTop: 23,
										flex: 1,
									}} >
									{"Party : 7/8"}
								</span>
								<button 
									style={{
										flexShrink: 0,
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-start",
										background: "#D5CEA3",
										borderRadius: 50,
										border: "none",
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 50,
										paddingRight: 50,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Join Party"}
									</span>
								</button>
							</div>
							<div 
								style={{
									height: 1,
									alignSelf: "stretch",
									background: "#1A120B",
								}}>
							</div>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
						}}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/3hed2f2p_expires_30_days.png"} 
							style={{
								height: 469,
								marginBottom: 15,
								alignSelf: "stretch",
								objectFit: "fill",
							}}
						/>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								marginBottom: 15,
							}}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 32,
									marginBottom: 15,
								}} >
								{"The Arcane Seekers"}
							</span>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"A fellowship of scholars, mages, and relic hunters devoted to uncovering lost knowledge."}
							</span>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									alignItems: "flex-start",
									marginBottom: 14,
									marginLeft: 5,
									marginRight: 5,
								}}>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
										marginTop: 23,
										flex: 1,
									}} >
									{"Party : 7/8"}
								</span>
								<button 
									style={{
										flexShrink: 0,
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-start",
										background: "#D5CEA3",
										borderRadius: 50,
										border: "none",
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 50,
										paddingRight: 50,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Join Party"}
									</span>
								</button>
							</div>
							<div 
								style={{
									height: 1,
									alignSelf: "stretch",
									background: "#1A120B",
								}}>
							</div>
						</div>
					</div>
				</div>
				<div 
					style={{
						alignSelf: "stretch",
						display: "flex",
						alignItems: "flex-start",
						marginBottom: 72,
						marginLeft: 40,
						marginRight: 40,
					}}>
					<div 
						style={{
							flex: 1,
							marginRight: 12,
						}}>
						<div 
							style={{
								height: 469,
								alignSelf: "stretch",
								background: "#DDDDDD",
								marginBottom: 15,
							}}>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								marginBottom: 15,
							}}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 32,
									marginBottom: 15,
								}} >
								{"Loading..."}
							</span>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
							</span>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									alignItems: "flex-start",
									marginBottom: 14,
									marginLeft: 5,
									marginRight: 5,
								}}>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
										marginTop: 23,
										flex: 1,
									}} >
									{"Party : 0/0"}
								</span>
								<button 
									style={{
										flexShrink: 0,
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-start",
										background: "#DDDDDD",
										borderRadius: 50,
										border: "none",
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 54,
										paddingRight: 54,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Loading"}
									</span>
								</button>
							</div>
							<div 
								style={{
									height: 1,
									alignSelf: "stretch",
									background: "#1A120B",
								}}>
							</div>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							marginRight: 12,
						}}>
						<div 
							style={{
								height: 469,
								alignSelf: "stretch",
								background: "#DDDDDD",
								marginBottom: 15,
							}}>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								marginBottom: 15,
							}}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 32,
									marginBottom: 15,
								}} >
								{"Loading..."}
							</span>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
							</span>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									alignItems: "flex-start",
									marginBottom: 14,
									marginLeft: 5,
									marginRight: 5,
								}}>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
										marginTop: 23,
										flex: 1,
									}} >
									{"Party : 0/0"}
								</span>
								<button 
									style={{
										flexShrink: 0,
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-start",
										background: "#DDDDDD",
										borderRadius: 50,
										border: "none",
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 54,
										paddingRight: 54,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Loading"}
									</span>
								</button>
							</div>
							<div 
								style={{
									height: 1,
									alignSelf: "stretch",
									background: "#1A120B",
								}}>
							</div>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
						}}>
						<div 
							style={{
								height: 469,
								alignSelf: "stretch",
								background: "#DDDDDD",
								marginBottom: 15,
							}}>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								marginBottom: 15,
							}}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 32,
									marginBottom: 15,
								}} >
								{"Loading..."}
							</span>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
							</span>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									alignItems: "flex-start",
									marginBottom: 14,
									marginLeft: 5,
									marginRight: 5,
								}}>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
										marginTop: 23,
										flex: 1,
									}} >
									{"Party : 0/0"}
								</span>
								<button 
									style={{
										flexShrink: 0,
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-start",
										background: "#DDDDDD",
										borderRadius: 50,
										border: "none",
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 54,
										paddingRight: 54,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Loading"}
									</span>
								</button>
							</div>
							<div 
								style={{
									height: 1,
									alignSelf: "stretch",
									background: "#1A120B",
								}}>
							</div>
						</div>
					</div>
				</div>
				<div 
					style={{
						alignSelf: "stretch",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						marginBottom: 204,
					}}>
					<img
						src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/fufakcjo_expires_30_days.png"} 
						style={{
							width: 134,
							height: 149,
							objectFit: "fill",
						}}
					/>
				</div>
				<div 
					style={{
						height: 1,
						alignSelf: "stretch",
						background: "#1A120B",
						marginBottom: 86,
						marginLeft: 40,
						marginRight: 40,
					}}>
				</div>
				<img
					src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/cw9sstuz_expires_30_days.png"} 
					style={{
						width: 18,
						height: 18,
						marginBottom: 5,
						marginLeft: 1351,
						objectFit: "fill",
					}}
				/>
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
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/axua6xtv_expires_30_days.png"} 
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
					src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/znptc323_expires_30_days.png"} 
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
						marginBottom: 40,
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