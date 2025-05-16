import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function MainPageSI(props) {
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
					height: 4324,
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
						alignItems: "center",
						marginTop: 20,
						marginBottom: 20,
						marginLeft: 40,
						marginRight: 40,
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
							marginRight: 249,
						}} >
						{"Inventory"}
					</span>
					<img
						src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/2lvzpgcl_expires_30_days.png"} 
						style={{
							width: 87,
							height: 87,
							objectFit: "fill",
							marginLeft: 250,
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
				<img
					src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/1d4wwee2_expires_30_days.png"} 
					style={{
						height: 608,
						marginBottom: 75,
						marginLeft: 40,
						marginRight: 40,
						alignSelf: "stretch",
						objectFit: "fill",
					}}
				/>
				<span 
					style={{
						color: "#1A120B",
						fontSize: 40,
						marginBottom: 68,
						marginLeft: 40,
						marginRight: 40,
					}} >
					{"Welcome to the Adventurer's Guild, home to bold explorers and treasure hunters! Here you can form parties, take on exciting quests, and store your hard-earned rewards in our secure vaults. We welcome all adventurers, from solo travelers to experienced groups, to embark on epic journeys and build their legacies!"}
				</span>
				<div 
					style={{
						height: 1,
						alignSelf: "stretch",
						background: "#1A120B",
						marginBottom: 51,
						marginLeft: 40,
						marginRight: 40,
					}}>
				</div>
				<div 
					style={{
						alignSelf: "stretch",
						display: "flex",
						alignItems: "center",
						marginBottom: 44,
						marginLeft: 60,
						marginRight: 60,
					}}>
					<span 
						style={{
							color: "#1A120B",
							fontSize: 100,
							marginRight: 682,
						}} >
						{"Party"}
					</span>
					<span 
						style={{
							color: "#1A120B",
							fontSize: 20,
							width: 507,
							marginLeft: 500,
						}} >
						{"Gather thy allies and forge a fellowship of strength and skill! The guild’s party system allows adventurers to band together, ensuring greater fortune and glory on their perilous quests."}
					</span>
					
				</div>
				<div 
					style={{
						display: "flex",
						alignItems: "flex-start",
						marginBottom: 80,
						marginLeft: 40,
					}}>
					<div 
						style={{
							flexShrink: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							marginRight: 20,
						}}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/9ywzfqma_expires_30_days.png"} 
							style={{
								width: 440,
								height: 469,
								marginBottom: 15,
								objectFit: "fill",
							}}
						/>
						<div 
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
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
									width: 437,
								}} >
								{"A band of seasoned warriors and cunning rogues, known for their fearless approach to battle."}
							</span>
							<button 
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								background: "#3C2A21",
								borderRadius: 50,
								border: "none",
								paddingTop: 21,
								paddingBottom: 21,
								paddingLeft: 155,
								paddingRight: 155,
								textAlign: "left",
								marginTop: 50,
								marginBottom: 0,
							}}
							onClick={()=>navigate("/party")}>
							<span 
								style={{
									color: "#F6F6F6",
									fontSize: 16,
								}} >
								{"Discover More"}
							</span>
						</button>
						</div>
					</div>
					<div 
						style={{
							flexShrink: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							marginRight: 20,
						}}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/29457e1v_expires_30_days.png"} 
							style={{
								width: 440,
								height: 469,
								marginBottom: 15,
								objectFit: "fill",
							}}
						/>
						<div 
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
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
									width: 422,
								}} >
								{"A fire-forged company of knights and battle mages who charge headfirst into danger."}
							</span>
						</div>
					</div>
					<div 
						style={{
							flexShrink: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							marginRight: 20,
						}}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/dqz5uhoh_expires_30_days.png"} 
							style={{
								width: 441,
								height: 469,
								marginBottom: 15,
								objectFit: "fill",
							}}
						/>
						<div 
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
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
									width: 404,
								}} >
								{"A fellowship of scholars, mages, and relic hunters devoted to uncovering lost knowledge."}
							</span>
						</div>
					</div>
					<div 
						style={{
							flexShrink: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}>
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/ir8pwvwh_expires_30_days.png"} 
							style={{
								width: 441,
								height: 469,
								marginBottom: 15,
								objectFit: "fill",
							}}
						/>
						<div 
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "left",
							}}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 32,
									marginBottom: 15,
									marginRight: 150,
								}} >
								{"The Silver Serpents"}
							</span>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 16,
									width: 404,
								}} >
								{"A swift and elusive guild of assassins, spellcasters, and scouts who favor precision over brute force."}
							</span>
							
						</div>
						
					</div>
					
				</div>
				<div 
					style={{
						height: 1,
						alignSelf: "stretch",
						background: "#1A120B",
						marginBottom: 39,
						marginLeft: 40,
						marginRight: 40,
					}}>
				</div>
				<div 
					style={{
						display: "flex",
						alignItems: "center",
						marginBottom: 34,
						marginLeft: 60,
					}}>
					<span 
						style={{
							color: "#1A120B",
							fontSize: 100,
							marginRight: 402,
						}} >
						{"Quests"}
					</span>
					<span 
						style={{
							color: "#1A120B",
							fontSize: 20,
							width: 667,
							marginLeft: 402,
						}} >
						{"Brave souls may take on quests ranging from simple errands to perilous adventures, each offering coin, glory, or rare treasures. Whether slaying beasts, retrieving lost relics, or aiding townsfolk, every quest shapes the legend of those who dare to accept it!"}
					</span>
				</div>
				<div 
					style={{
						alignSelf: "stretch",
						display: "flex",
						alignItems: "flex-start",
						marginBottom: 70,
						marginLeft: 40,
						marginRight: 40,
					}}>
					<div 
						style={{
							flexShrink: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							marginTop: 106,
							marginRight: 78,
						}}>
						<div 
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								marginBottom: 25,
							}}>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 32,
									marginBottom: 5,
								}} >
								{"A Merchant’s Misfortune"}
							</span>
							<span 
								style={{
									color: "#1A120B",
									fontSize: 12,
								}} >
								{"Rank: C | Deadline: 27th of Alturiak, “Claw of Winter”"}
							</span>
						</div>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 16,
								marginBottom: 25,
								width: 414,
							}} >
							{"A traveling merchant was ambushed by bandits along the King’s Road, losing both his wares and his guards. Recover his stolen goods and, if possible, make sure the scoundrels regret their deeds."}
						</span>
						<div 
							style={{
								width: 440,
								height: 1,
								background: "#1A120B",
								marginBottom: 19,
							}}>
						</div>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 24,
								fontWeight: "bold",
								marginBottom: 19,
							}} >
							{"Join Quest Party"}
						</span>
						<div 
							style={{
								width: 440,
								height: 1,
								background: "#1A120B",
								marginBottom: 21,
							}}>
						</div>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 24,
								fontWeight: "bold",
								marginBottom: 93,
							}} >
							{"Solo Quest"}
						</span>
						<button 
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								background: "#3C2A21",
								borderRadius: 50,
								border: "none",
								paddingTop: 21,
								paddingBottom: 21,
								paddingLeft: 155,
								paddingRight: 155,
								textAlign: "left",
							}}
							onClick={()=>navigate("/quests")}>
							<span 
								style={{
									color: "#F6F6F6",
									fontSize: 16,
								}} >
								{"Discover More"}
							</span>
						</button>
					</div>
					<div 
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							paddingTop: 528,
							paddingBottom: 20,
							backgroundImage: 'url(https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/yqeu92oc_expires_30_days.png)',
							backgroundSize: "cover",
							backgroundPosition: "center",
							marginLeft: 20,
						}}>
						<div 
							style={{
								display: "flex",
								alignItems: "flex-start",
							}}>
							<div 
								style={{
									width: 40,
									height: 12,
									background: "#DE0000",
									borderRadius: 10,
									marginRight: 20,
								}}>
							</div>
							<div 
								style={{
									width: 40,
									height: 12,
									background: "#F6F6F6",
									borderRadius: 10,
									marginRight: 20,
								}}>
							</div>
							<div 
								style={{
									width: 40,
									height: 12,
									background: "#F6F6F6",
									borderRadius: 10,
									marginRight: 20,
								}}>
							</div>
							<div 
								style={{
									width: 40,
									height: 12,
									background: "#F6F6F6",
									borderRadius: 10,
								}}>
							</div>
						</div>
					</div>
				</div>
				<div 
					style={{
						height: 1,
						alignSelf: "stretch",
						background: "#1A120B",
						marginBottom: 59,
						marginLeft: 40,
						marginRight: 40,
					}}>
				</div>
				<div 
					style={{
						display: "flex",
						alignItems: "flex-start",
						marginBottom: 60,
						marginLeft: 60,
					}}>
					<div 
						style={{
							flexShrink: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							marginRight: 20,
						}}>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 100,
								marginBottom: 228,
							}} >
							{"Vault"}
						</span>
						<span 
							style={{
								color: "#1A120B",
								fontSize: 20,
								marginBottom: 40,
								width: 415,
							}} >
							{"The guild’s Vault System offers a secure haven for adventurers to store their hard-earned treasures, rare artifacts, and excess coin. Only the rightful owner—or those bearing a guild-sanctioned sigil—may access its well-guarded depths."}
						</span>
						<button 
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								background: "#3C2A21",
								borderRadius: 50,
								border: "none",
								paddingTop: 21,
								paddingBottom: 21,
								paddingLeft: 158,
								paddingRight: 158,
								textAlign: "left",
							}}
							onClick={()=>navigate("/vault")}>
							<span 
								style={{
									color: "#F6F6F6",
									fontSize: 16,
								}} >
								{"Store Items"}
							</span>
						</button>
					</div>
					<img
						src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/5e84wp0w_expires_30_days.png"} 
						style={{
							width: 1270,
							height: 860,
							marginTop: 15,
							objectFit: "fill",
							marginLeft: 90,
						}}
					/>
				</div>
				<div 
					style={{
						height: 1,
						alignSelf: "stretch",
						background: "#1A120B",
						marginBottom: 108,
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
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/c9thllh0_expires_30_days.png"} 
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
					src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/5pN02KiAxF/xhxsa3jd_expires_30_days.png"} 
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
	);
}