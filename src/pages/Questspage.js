import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function QuestsPage(props) {
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
					height: 4606,
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
    to="/joinparty"
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
				<span 
					style={{
						fontFamily: "'Cloister Black', serif",
						color: "#1A120B",
						fontSize: 100,
						marginBottom: 40,
						marginLeft: 40,
					}} >
					{"Quest Board"}
				</span>
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
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/qikdhxuw_expires_30_days.png"} 
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
								marginBottom: 40,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									marginBottom: 24,
								}}>
								<span 
									style={{
										fontFamily: "'Cloister Black', serif",
										color: "#1A120B",
										fontSize: 40,
									}} >
									{"A Merchant’s Misfortune"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
									}} >
									{"Rank: C | Deadline: 27th of Alturiak, “Claw of Winter”"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
									width: 520,
								}} >
								{"A traveling merchant was ambushed by bandits along the King’s Road, losing both his wares and his guards. Recover his stolen goods and, if possible, make sure the scoundrels regret their deeds."}
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
									{"Difficulty: ★★☆☆☆"}
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
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 47,
										paddingRight: 47,
										marginRight: 15,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Solo Quest"}
									</span>
								</button>
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
										paddingLeft: 45,
										paddingRight: 45,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Party Quest"}
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
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/621cmw7t_expires_30_days.png"} 
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
								marginBottom: 40,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									marginBottom: 24,
								}}>
								<span 
									style={{
										fontFamily: "'Cloister Black', serif",
										color: "#1A120B",
										fontSize: 40,
									}} >
									{"Ale and Antics"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
									}} >
									{'Rank: D | Deadline: 3rd of Ches, "The Claw of Sunsets"'}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
									width: 520,
								}} >
								{"The local tavern is in dire need of a bard for their festival, but none have answered the call. If ye have a way with song or tale, come forth and earn a handsome reward in coin and cheer!"}
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
									{"Difficulty: ★☆☆☆☆"}
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
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 46,
										paddingRight: 46,
										marginRight: 14,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Solo Quest"}
									</span>
								</button>
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
										paddingLeft: 45,
										paddingRight: 45,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Party Quest"}
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
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/bqm7v6ii_expires_30_days.png"} 
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
								marginBottom: 59,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									marginBottom: 24,
								}}>
								<span 
									style={{
										fontFamily: "'Cloister Black', serif",
										color: "#1A120B",
										fontSize: 40,
									}} >
									{"Escort the Arcane"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
									}} >
									{'Rank: B | Deadline: 15th of Ches, "The Claw of Sunsets"'}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
									width: 520,
								}} >
								{"A reclusive wizard seeks safe passage through the Cragspire Cliffs. Guard him well—his mind holds secrets that many would kill to steal."}
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
									{"Difficulty: ★★★☆☆"}
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
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 47,
										paddingRight: 47,
										marginRight: 15,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Solo Quest"}
									</span>
								</button>
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
										paddingLeft: 45,
										paddingRight: 45,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Party Quest"}
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
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/3un1ot9i_expires_30_days.png"} 
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
								marginBottom: 40,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									marginBottom: 24,
								}}>
								<span 
									style={{
										fontFamily: "'Cloister Black', serif",
										color: "#1A120B",
										fontSize: 40,
									}} >
									{"Plague Rats"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
									}} >
									{"Rank: D | Deadline: 24th of Alturiak, “Claw of Winter”"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
									width: 520,
								}} >
								{"The local tavern is in dire need of a bard for their festival, but none have answered the call. If ye have a way with song or tale, come forth and earn a handsome reward in coin and cheer!"}
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
									{"Difficulty: ★☆☆☆☆"}
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
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 46,
										paddingRight: 46,
										marginRight: 14,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Solo Quest"}
									</span>
								</button>
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
										paddingLeft: 45,
										paddingRight: 45,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Party Quest"}
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
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/qb4ngel4_expires_30_days.png"} 
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
								marginBottom: 59,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									marginBottom: 24,
								}}>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 32,
									}} >
									{"A Noble’s Folly"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
									}} >
									{'Rank: A | Deadline: 15th of Ches, "The Claw of Sunsets"'}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
									width: 520,
								}} >
								{"A young noble vanished on a reckless solo expedition to a monster-infested ruin. Find him—alive, if possible—and uncover the secrets he sought."}
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
									{"Difficulty: ★★★★☆"}
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
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 47,
										paddingRight: 47,
										marginRight: 15,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Solo Quest"}
									</span>
								</button>
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
										paddingLeft: 45,
										paddingRight: 45,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Party Quest"}
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
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/bo69dh2g_expires_30_days.png"} 
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
								marginBottom: 40,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									marginBottom: 24,
								}}>
								<span 
									style={{
										fontFamily: "'Cloister Black', serif",
										color: "#1A120B",
										fontSize: 40,
									}} >
									{"Whispers of the Hollow Oak"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
									}} >
									{"Rank: D | Deadline: 24th of Alturiak, “Claw of Winter”"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
									width: 520,
								}} >
								{"Mysterious whispers echo from an ancient tree in Elderglen Forest. Uncover its secrets and choose to seal its magic—or unleash it."}
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
									marginTop: 31,
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
									{"Difficulty: ★☆☆☆☆"}
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
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 46,
										paddingRight: 46,
										marginRight: 14,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Solo Quest"}
									</span>
								</button>
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
										paddingLeft: 45,
										paddingRight: 45,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Party Quest"}
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
						marginBottom: 80,
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
								marginBottom: 59,
							}}>
							<div 
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									marginBottom: 24,
								}}>
								<span 
									style={{
										fontFamily: "'Cloister Black', serif",
										color: "#1A120B",
										fontSize: 40,
									}} >
									{"Loading..."}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
									}} >
									{"Rank: n/a | Deadline: n/a"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
									width: 520,
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
									{"Difficulty: ☆☆☆☆☆"}
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
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 47,
										paddingRight: 47,
										marginRight: 15,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Solo Quest"}
									</span>
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
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 45,
										paddingRight: 45,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Party Quest"}
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
								marginBottom: 59,
							}}>
							<div 
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									marginBottom: 24,
								}}>
								<span 
									style={{
										fontFamily: "'Cloister Black', serif",
										color: "#1A120B",
										fontSize: 40,
									}} >
									{"Loading..."}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 16,
									}} >
									{"Rank: n/a | Deadline: n/a"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
									width: 520,
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
									{"Difficulty: ☆☆☆☆☆"}
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
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 46,
										paddingRight: 46,
										marginRight: 14,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Solo Quest"}
									</span>
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
										paddingTop: 15,
										paddingBottom: 15,
										paddingLeft: 45,
										paddingRight: 45,
										textAlign: "left",
									}}
									onClick={()=>alert("Pressed!")}>
									<span 
										style={{
											color: "#1A120B",
											fontSize: 12,
										}} >
										{"Party Quest"}
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
						marginBottom: 271,
					}}>
					<img
						src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/ixaequ0x_expires_30_days.png"} 
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
						marginBottom: 109,
						marginLeft: 41,
						marginRight: 41,
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
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/35e60joz_expires_30_days.png"} 
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
					src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/275ko4mg_expires_30_days.png"} 
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