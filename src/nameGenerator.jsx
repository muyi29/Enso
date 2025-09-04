// nameGenerator.js
const suffixes = [
  // Original suffixes
  "Fi", "Finance", "Vault", "Swap", "Pool", "Protocol", "X", "Yield",
  "Flow", "Fund", "Token", "Node", "Bridge", "Stack", "Boost", "Lab",
  "Network", "Exchange", "Hub", "Engine",
  "Chain", "Coin", "Cash", "Bank", "Pay", "Wallet", "Trade", "Market",
  "Capital", "Asset", "Stake", "Mine", "Farm", "Lock", "Mint", "Burn",
  "DAO", "DEX", "CEX", "DeFi", "CeFi", "NFT", "AMM", "LP", "APY",
  "TVL", "Liquidity", "Reserve", "Treasury", "Vault", "Safe", "Shield",
  "Guard", "Secure", "Trust", "Prime", "Pro", "Plus", "Max", "Ultra",
  "Super", "Mega", "Giga", "Meta", "Alpha", "Beta", "Gamma", "Delta",
  "Sigma", "Omega", "Genesis", "Nexus", "Matrix", "Core", "Base", "Edge",
  "Peak", "Summit", "Apex", "Zone", "Sphere", "Realm", "World", "Verse",
  "Space", "Place", "Land", "City", "Port", "Gate", "Door", "Link",
  "Connect", "Sync", "Match", "Pair", "Unite", "Join", "Merge", "Fuse",
  "Blend", "Mix", "Cross", "Multi", "Omni", "All", "One", "Zero",
  "Infinity", "Loop", "Cycle", "Wave", "Pulse", "Beat", "Rhythm", "Tempo",
  "Speed", "Fast", "Quick", "Rapid", "Instant", "Flash", "Bolt", "Rush",
  "Dash", "Sprint", "Zoom", "Turbo", "Nitro", "Power", "Force", "Energy",
  "Fuel", "Gas", "Oil", "Electric", "Solar", "Wind", "Fire", "Ice",
  "Water", "Earth", "Air", "Sky", "Star", "Moon", "Sun", "Light",
  "Dark", "Shadow", "Ghost", "Spirit", "Soul", "Mind", "Brain", "Think",
  "Smart", "Wise", "Genius", "Master", "Expert", "Ace", "Hero", "Legend",
  "Myth", "Epic", "Grand", "Royal", "Noble", "Elite", "Premium", "Luxury",
  "Diamond", "Gold", "Silver", "Bronze", "Platinum", "Crystal", "Gem", "Pearl",
  "Ruby", "Emerald", "Sapphire", "Opal", "Jade", "Amber", "Steel", "Iron",
  "Copper", "Zinc", "Alloy", "Metal", "Rock", "Stone", "Marble", "Granite",
  "Quartz", "Flint", "Brick", "Wood", "Bamboo", "Oak", "Pine", "Cedar",
  "Maple", "Cherry", "Apple", "Orange", "Lemon", "Lime", "Berry", "Grape",
  "Mint", "Sage", "Basil", "Thyme", "Rose", "Lily", "Tulip", "Daisy",
  "Violet", "Iris", "Orchid", "Lotus", "Zen", "Peace", "Calm", "Pure",
  "Clean", "Fresh", "New", "Modern", "Future", "Next", "Advanced", "High",
  "Top", "Best", "First", "Last", "Final", "Ultimate", "Perfect", "Ideal",
  "True", "Real", "Authentic", "Original", "Classic", "Vintage", "Retro", "Old",

  // +100 New Suffixes
  "Labs", "Works", "Systems", "OS", "NodeX", "Nodes", "Compute", "Scale", "Layer",
  "Rollup", "BridgeX", "Router", "Route", "Relay", "Mesh", "Grid", "Cloud", "Cluster",
  "Portal", "Dock", "Anchor", "Harbor", "Chainz", "Ledger", "VaultX", "BridgeNet", "CrossNet",
  "SphereX", "Worlds", "Realms", "Planes", "Dimensions", "Minds", "Signals", "Beacon", "PulseX",
  "YieldX", "FarmX", "StakeX", "PoolX", "SwapX", "TradeX", "DexX", "Perp", "Perps",
  "Spot", "Futures", "Options", "Synthetic", "Synths", "Derivatives", "MarketsX", "Index", "Indices",
  "Oracle", "Oracles", "DataX", "Graph", "Subgraph", "Scan", "Explorer", "Insights", "Analytics",
  "Bots", "Agents", "AI", "Neurons", "Brains", "Synapse", "SignalsX", "AlgoX", "EngineX",
  "Drive", "Run", "Chainlink", "Hook", "Latch", "Keys", "Keyring", "Vaults", "Keep",
  "GuardX", "ShieldX", "SecureX", "SafeX", "LockX", "Hold", "FreezeX", "Proof", "ProofX",
  "MintX", "BurnX", "Forge", "Foundry", "MineX", "Drill", "Dig", "TokenX", "PayX",
  "FiX", "LayerX", "HyperX", "NovaX", "MatrixX", "ZoneX", "VerseX", "SpaceX", "HubX"
];

const prefixes = [
  // Original prefixes
  "Hyper", "Falcon", "Quantum", "Nova", "Luna", "Aero", "Crypto",
  "Vault", "Chain", "DeFi", "Atomic", "Block", "Liquid", "Fusion",
  "Solar", "Titan", "Nebula", "Pulse", "Orbit", "Iron",
  
  // Original + 200 additional prefixes
  "Cyber", "Digital", "Virtual", "Meta", "Neo", "Ultra", "Super", "Mega",
  "Giga", "Tera", "Nano", "Micro", "Mini", "Maxi", "Alpha", "Beta",
  "Gamma", "Delta", "Sigma", "Omega", "Prime", "Proto", "Genesis", "Nexus",
  "Matrix", "Vector", "Tensor", "Scalar", "Binary", "Hex", "Octal", "Decimal",
  "Bit", "Byte", "Data", "Info", "Code", "Hash", "Algo", "Logic",
  "Neural", "Smart", "Intel", "Genius", "Wise", "Sharp", "Quick", "Fast",
  "Rapid", "Swift", "Speed", "Turbo", "Nitro", "Boost", "Power", "Force",
  "Energy", "Electric", "Plasma", "Laser", "Photon", "Electron", "Proton", "Neutron",
  "Atom", "Molecule", "Crystal", "Diamond", "Gold", "Silver", "Platinum", "Steel",
  "Carbon", "Silicon", "Copper", "Chrome", "Titanium", "Cobalt", "Nickel", "Zinc",
  "Fire", "Flame", "Blaze", "Spark", "Flash", "Thunder", "Lightning", "Storm",
  "Wind", "Gale", "Breeze", "Air", "Sky", "Cloud", "Rain", "Snow",
  "Ice", "Frost", "Chill", "Cool", "Cold", "Freeze", "Arctic", "Polar",
  "Thermal", "Heat", "Warm", "Hot", "Burn", "Torch", "Beacon", "Signal",
  "Wave", "Radio", "Sonic", "Echo", "Sound", "Voice", "Music", "Tone",
  "Rhythm", "Beat", "Pulse", "Vibe", "Flow", "Stream", "River", "Ocean",
  "Sea", "Lake", "Pool", "Spring", "Well", "Source", "Origin", "Root",
  "Base", "Core", "Center", "Hub", "Node", "Point", "Spot", "Mark",
  "Sign", "Symbol", "Icon", "Logo", "Brand", "Name", "Tag", "Label",
  "Blue", "Red", "Green", "Yellow", "Orange", "Purple", "Pink", "Black",
  "White", "Gray", "Brown", "Violet", "Indigo", "Cyan", "Magenta", "Lime",
  "Mint", "Sage", "Olive", "Navy", "Teal", "Aqua", "Coral", "Peach",
  "Royal", "Noble", "Elite", "Premium", "Luxury", "Grand", "Epic", "Legendary",
  "Mythic", "Magic", "Mystic", "Cosmic", "Galactic", "Universal", "Infinite", "Eternal",
  "Divine", "Sacred", "Holy", "Pure", "Clean", "Clear", "Bright", "Brilliant",
  "Stellar", "Celestial", "Astral", "Lunar", "Solar", "Phoenix", "Dragon", "Eagle",
  "Hawk", "Wolf", "Lion", "Tiger", "Bear", "Shark", "Whale", "Dolphin",
  "Octopus", "Spider", "Ant", "Bee", "Butterfly", "Firefly", "Dragonfly", "Mantis",

  // +100 New Prefixes
  "Synth", "Quant", "CryptoX", "Web", "Web3", "MetaX", "Layer", "Roll",
  "Stack", "Shard", "NodeX", "Cross", "Multi", "Poly", "Omni", "Uni",
  "Tri", "Quad", "Hexa", "Octa", "Deca", "HyperX", "MetaChain", "CrossChain",
  "ChainX", "BridgeX", "Router", "Mesh", "Lattice", "Grid", "Cluster", "Cloud",
  "SkyX", "StarX", "MoonX", "SunX", "PulseX", "EnergyX", "Volt", "Amp",
  "SparkX", "Blitz", "FlashX", "PhotonX", "Quark", "Boson", "Muon", "Hadron",
  "Gluon", "QuantumX", "AI", "AIX", "ML", "Deep", "Neuro", "Synapse",
  "Bot", "Agent", "Auto", "Self", "Run", "SpeedX", "TurboX", "NitroX",
  "Rocket", "Warp", "Zoom", "DashX", "SprintX", "Flux", "FlowX", "StreamX",
  "WaveX", "LiquidX", "MetaFi", "DeFiX", "CeFiX", "NFTX", "Game", "GameX",
  "MetaGame", "Play", "PlayX", "Loot", "LootX", "Quest", "QuestX", "Guild",
  "DAOX", "Gov", "Vote", "Prop", "PropX", "StakeX", "YieldX", "FarmX",
  "MintX", "Forge", "Foundry", "LabX", "Test", "Sim", "ProtoX", "BetaX"
];

export function generateName() {
  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const prefix = random(prefixes);
  const suffix = random(suffixes);

  // Always combine into one word
  return `${prefix}${suffix}`;
}
