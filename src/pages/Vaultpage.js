import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Vaultpage(props) {
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
					height: 4748,
					alignSelf: "stretch",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
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
					<img
						src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/eq1wylr4_expires_30_days.png"} 
                        onClick={()=>navigate("/MainSI")}
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
						alignItems: "center",
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
						{"Guild Vault"}
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
							marginRight: 40,
							textAlign: "left",
						}}
						onClick={()=>alert("Pressed!")}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/3z20jhq7_expires_30_days.png"} 
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
							paddingTop: 22,
							paddingBottom: 22,
							paddingLeft: 10,
							paddingRight: 10,
							textAlign: "left",
						}}
						onClick={()=>alert("Pressed!")}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/zolkkzl1_expires_30_days.png"} 
							style={{
								width: 30,
								height: 6,
								objectFit: "fill",
							}}
						/>
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
							marginRight: 12,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 45,
									paddingBottom: 45,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/s2uviujk_expires_30_days.png"} 
									style={{
										height: 236,
										marginLeft: 76,
										marginRight: 76,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 21,
							}}>
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
										marginBottom: 4,
									}} >
									{"Crimson Draught"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Uncommon | Quantity: 38 | Magical: Yes"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"A vial of glowing red elixir that mends wounds swiftly. Best consumed before battle, lest its heat turn on the drinker."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							marginRight: 12,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 45,
									paddingBottom: 45,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/pdffk7hs_expires_30_days.png"} 
									style={{
										height: 236,
										marginLeft: 76,
										marginRight: 76,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Thieveshade Oil"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Common | Quantity: 28 | Magical: No"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"A dark, viscous liquid used to dampen blade shine and silence metal. A rogue's best friend."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							marginRight: 12,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 48,
									paddingBottom: 48,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/oonweldn_expires_30_days.png"} 
									style={{
										height: 229,
										marginLeft: 61,
										marginRight: 61,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 21,
							}}>
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
										marginBottom: 4,
									}} >
									{"Scroll of Ashen Tongues"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Rare | Quantity: 9 | Magical: Yes"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Unfurl this scroll and speak forgotten words that echo in the minds of the dead. One use only—if you dare."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 58,
									paddingBottom: 58,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/ni14n25m_expires_30_days.png"} 
									style={{
										height: 210,
										marginLeft: 67,
										marginRight: 67,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Pouch of Dustroot"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Rare | Quantity: 12 | Magical: No"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Filled with a rare powdered herb that grants clarity... or hallucination. Best used with caution."}
							</span>
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
							marginRight: 12,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 39,
									paddingBottom: 39,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/bk27mrko_expires_30_days.png"} 
									style={{
										height: 247,
										marginLeft: 10,
										marginRight: 10,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Throwing Knife & Book"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Common | Quantity: 42 | Magical: Yes"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Lightweight and perfectly balanced. Often favored by adventurers favored by arcane."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							marginRight: 12,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 48,
									paddingBottom: 48,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/n0e406ou_expires_30_days.png"} 
									style={{
										height: 230,
										marginLeft: 61,
										marginRight: 61,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Ironhelm Guard"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Uncommon | Quantity: 49 | Magical: No"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Worn by those who guard the silence of crypts. Dampens fear, but never removes it."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							marginRight: 12,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 58,
									paddingBottom: 58,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/bo0gd2zz_expires_30_days.png"} 
									style={{
										height: 210,
										marginLeft: 55,
										marginRight: 55,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Wyrmcrest Buckler"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Rare | Quantity: 12 | Magical: Yes"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Offers minor flame resistance. The wyrm etched on its face snarls faintly when near fire."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 45,
									paddingBottom: 45,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/mosxga0b_expires_30_days.png"} 
									style={{
										height: 236,
										marginLeft: 54,
										marginRight: 54,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Dusk Watcher’s Bracer"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Uncommon | Quantity: 27 | Magical: No"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Hardened leather gloves reinforced with iron, worn by night sentries and monster hunters."}
							</span>
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
							marginRight: 12,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 46,
									paddingBottom: 46,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/o59v1yje_expires_30_days.png"} 
									style={{
										height: 234,
										marginLeft: 30,
										marginRight: 30,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 21,
							}}>
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
										marginBottom: 4,
									}} >
									{"Bloodreaver Axe"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Rare | Quantity: 3 | Magical: Yes"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"A chipped, brutal weapon that sings with every strike. Said to grow stronger with each foe felled."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							marginRight: 12,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 63,
									paddingBottom: 63,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/ylud7w6r_expires_30_days.png"} 
									style={{
										height: 200,
										marginLeft: 56,
										marginRight: 56,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Rust-bent Crossbow"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Common | Quantity: 25 | Magical: No"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Old, dependable, and a little cranky. Still fires true at close range."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							marginRight: 12,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 72,
									paddingBottom: 72,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/vabsq3op_expires_30_days.png"} 
									style={{
										height: 181,
										marginLeft: 65,
										marginRight: 65,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Sunstone Amulet"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Rare | Quantity: 4 | Magical: No"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Holds a single pulse of radiant light. Blinds the undead and purges minor curses."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 47,
									paddingBottom: 47,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/g5a0byav_expires_30_days.png"} 
									style={{
										height: 232,
										marginLeft: 44,
										marginRight: 44,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Warden’s Key"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Rare | Quantity: 17 | Magical: No"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"No one remembers what it opens—only that some doors still whisper its name."}
							</span>
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
							marginRight: 12,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 58,
									paddingBottom: 58,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/4unfgotd_expires_30_days.png"} 
									style={{
										height: 210,
										marginLeft: 61,
										marginRight: 61,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Bone Ring of Binding"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Rare | Quantity: 14 | Magical: Yes"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Worn by necromancers to command lesser dead. It hums near burial grounds."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							marginRight: 12,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 42,
									paddingBottom: 42,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/gavsfvim_expires_30_days.png"} 
									style={{
										height: 243,
										marginLeft: 45,
										marginRight: 45,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Mail of Ironweave"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Very Rare | Quantity: 2 | Magical: Yes"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Forged from woven steel and runes. Light as leather, tough as dragonscale."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							marginRight: 12,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 40,
									paddingBottom: 40,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/tvuoo13h_expires_30_days.png"} 
									style={{
										height: 247,
										marginLeft: 68,
										marginRight: 68,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Claw of the Abyss"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Rare | Quantity: 12 | Magical: Yes"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Pulled from a rift horror. Can tear through soulbound wards when wielded with hate."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 44,
									paddingBottom: 44,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/lqw682uz_expires_30_days.png"} 
									style={{
										height: 239,
										marginLeft: 67,
										marginRight: 67,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Grappling Hook"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Common | Quantity: 29 | Magical: No"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Used by fire escape artists and roof-thieves. Smells faintly of sulfur."}
							</span>
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
							marginRight: 12,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 40,
									paddingBottom: 40,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/zb3x2pxn_expires_30_days.png"} 
									style={{
										height: 245,
										marginLeft: 48,
										marginRight: 48,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Fangblade Dagger"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Rare | Quantity: 21 | Magical: Yes"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Stays sharp forever and drinks a drop of blood from each wound it makes."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							marginRight: 12,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 40,
									paddingBottom: 40,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/vu2scvii_expires_30_days.png"} 
									style={{
										height: 246,
										marginLeft: 73,
										marginRight: 73,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Vessel of Binding Ashes"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Very Rare | Quantity: 1 | Magical: Yes"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Summons a cursed soul for a single task. Its screams echo long after."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							marginRight: 12,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 45,
									paddingBottom: 45,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/qsebqy88_expires_30_days.png"} 
									style={{
										height: 236,
										marginLeft: 31,
										marginRight: 31,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Slave’s Oath Chain"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Rare | Quantity: 10 | Magical: Yes"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Worn by freed slaves. Protects against charm and fear spells."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
						}}>
						<div 
							style={{
								alignSelf: "stretch",
								background: "#E1E1E1",
								marginBottom: 20,
							}}>
							<div 
								style={{
									alignSelf: "stretch",
									display: "flex",
									flexDirection: "column",
									background: "#E1E1E1",
									paddingTop: 50,
									paddingBottom: 50,
									marginLeft: 1,
									marginRight: 1,
								}}>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/14qt4w9l_expires_30_days.png"} 
									style={{
										height: 221,
										marginLeft: 67,
										marginRight: 67,
										alignSelf: "stretch",
										objectFit: "fill",
									}}
								/>
							</div>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Forgotten Order Sigil"}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Rare | Quantity: 17 | Magical: Yes"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Gripped tightly, grants brief invisibility. Glows dimly in moonlight."}
							</span>
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
								height: 326,
								alignSelf: "stretch",
								background: "#DDDDDD",
								marginBottom: 20,
							}}>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Loading..."}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Uncommon | Quantity: 38 | Magical: Yes: n/a"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							marginRight: 12,
						}}>
						<div 
							style={{
								height: 326,
								alignSelf: "stretch",
								background: "#DDDDDD",
								marginBottom: 20,
							}}>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Loading..."}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Uncommon | Quantity: 38 | Magical: Yes: n/a"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
							marginRight: 12,
						}}>
						<div 
							style={{
								height: 326,
								alignSelf: "stretch",
								background: "#DDDDDD",
								marginBottom: 20,
							}}>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Loading..."}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Uncommon | Quantity: 38 | Magical: Yes: n/a"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
							</span>
						</div>
						<div 
							style={{
								height: 1,
								alignSelf: "stretch",
								background: "#1A120B",
							}}>
						</div>
					</div>
					<div 
						style={{
							flex: 1,
						}}>
						<div 
							style={{
								height: 326,
								alignSelf: "stretch",
								background: "#DDDDDD",
								marginBottom: 20,
							}}>
						</div>
						<div 
							style={{
								alignSelf: "stretch",
								display: "flex",
								flexDirection: "column",
								marginBottom: 40,
							}}>
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
										marginBottom: 4,
									}} >
									{"Loading..."}
								</span>
								<span 
									style={{
										color: "#1A120B",
										fontSize: 12,
									}} >
									{"Rarity: Uncommon | Quantity: 38 | Magical: Yes: n/a"}
								</span>
							</div>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
								}} >
								{"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
							</span>
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
				<img
					src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/ejrot3kx_expires_30_days.png"} 
					style={{
						width: 111,
						height: 124,
						marginBottom: 223,
						objectFit: "fill",
					}}
				/>
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
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/ps0im5fk_expires_30_days.png"} 
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
					src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/d2kf3ad7_expires_30_days.png"} 
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