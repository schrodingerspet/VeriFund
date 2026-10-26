# VeriFund — Decentralized Blockchain Charity Platform

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-13.5-black)
![Django](https://img.shields.io/badge/Django-4.2-green)
![Ethereum](https://img.shields.io/badge/Ethereum-Solidity-purple)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![Web3](https://img.shields.io/badge/Web3-Ethers.js-orange)

**A transparent, secure, and decentralized charity donation platform powered by Ethereum blockchain and Django.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation Guide](#-installation-guide) • [Running the Project](#-running-the-project) • [MetaMask Setup](#-metamask-setup) • [User Walkthrough](#-user-walkthrough)

</div>

---

## 🌟 Overview

**VeriFund** is a modern Web3 charity platform engineered to bring absolute transparency, security, and trust to charitable giving. Built on the Ethereum blockchain, VeriFund ensures every single donation is recorded immutably on-chain, eliminating middlemen and providing donors with verifiable cryptographic proof of their contributions.

---

## ✨ Features

### 👤 For Donors
- **MetaMask Web3 Wallet Integration:** One-click connect, switch networks, and manage profile.
- **Explore Verified Charities:** Browse verified campaigns categorized by cause (Medical, Education, Disaster Relief, etc.).
- **Direct Crypto Donations:** Instant, secure cryptocurrency donations sent directly to charity smart contracts.
- **On-Chain Donation History:** Real-time verifiable transaction hashes and receipts.

### 🏛️ For Charities
- **Launch Fundraising Campaigns:** Deploy campaign goals on-chain with target ETH amounts.
- **KYC & Document Verification:** Upload official documentation and government IDs for verification.
- **Direct Fund Custody:** Funds are received directly into charity wallets without platform custody.

### 🛡️ For Platform Admins
- **Verification Portal:** Inspect uploaded KYC documents, approve or reject charity applications.
- **Smart Contract Verification:** Directly verify charities on-chain via smart contract calls.
- **Platform Analytics & Controls:** Monitor real-time platform metrics and active campaigns.

---

## 💻 Tech Stack

- **Frontend:** Next.js 13 (App Router), TypeScript, Tailwind CSS, Radix UI / Shadcn, Lucide Icons, Plus Jakarta Sans.
- **Blockchain:** Solidity (0.8.19), Hardhat, Ethers.js v6.
- **Backend:** Django 4.2 REST Framework, SQLite / PostgreSQL, Django CORS Headers, Pinata IPFS integration.

---

## 🛠️ Installation Guide

### Prerequisites
Make sure you have installed on your machine:
- **Node.js** (v18.x or v20.x) & `npm`
- **Python** (3.8+ / 3.10+ / 3.12+ / 3.14+)
- **MetaMask** browser extension ([metamask.io](https://metamask.io))

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/schrodingerspet/VeriFund.git
cd VeriFund
```

### Step 2: Install Frontend Dependencies
```bash
npm install
```

### Step 3: Install & Compile Smart Contracts
```bash
cd contracts
npm install
npx hardhat compile
cd ..
```

### Step 4: Setup Backend Virtual Environment
```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux/macOS (bash/zsh):
source venv/bin/activate
# On Linux (fish shell):
# source venv/bin/activate.fish
# On Windows:
# venv\Scripts\activate

# Install Python requirements
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# (Optional) Create Django superuser for admin panel
python manage.py createsuperuser

cd ..
```

---

## 🚀 Running the Project

Open **3 separate terminals** in VS Code:

### Terminal 1: Local Blockchain (Hardhat Node)
```bash
cd contracts
npx hardhat node
```
> Runs a local Ethereum node at `http://127.0.0.1:8545` (Chain ID: `31337`) with 20 pre-funded test accounts (10,000 ETH each).

*(In a new quick terminal, deploy the smart contract to the local node:)*
```bash
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```

### Terminal 2: Backend REST API (Django)
```bash
backend/venv/bin/python backend/manage.py runserver
```
> Backend API will be live at `http://localhost:8000`. Admin dashboard at `http://localhost:8000/admin`.

### Terminal 3: Frontend (Next.js)
```bash
npm run dev
```
> Frontend will be live at `http://localhost:3000`.

---

## 🦊 MetaMask Setup

1. Open the **MetaMask** extension.
2. Click the Network dropdown (top-left) ➔ **Add Network** ➔ **Add a network manually**:
   - **Network Name:** `Hardhat Localhost`
   - **New RPC URL:** `http://127.0.0.1:8545`
   - **Chain ID:** `31337`
   - **Currency Symbol:** `ETH`
3. Save and switch to `Hardhat Localhost`.
4. Import Hardhat test accounts:
   - In MetaMask: Account Icon ➔ **Add account or hardware wallet** ➔ **Import account**.
   - Copy the private key of **Account #0** (Admin) from Terminal 1:
     ```
     0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
     ```
   - Import **Account #1** for donor testing:
     ```
     0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
     ```

---

## 📖 User Walkthrough

### 1. Donor Workflow
1. Navigate to `http://localhost:3000`.
2. Click **Connect Wallet** in the top-right.
3. Click your wallet badge ➔ **Create Profile** (select `donor`).
4. Go to **Charities** (`/charities`) and click **Donate Now** on any approved charity.
5. Enter the donation amount in ETH and confirm the transaction in MetaMask.
6. View your on-chain donation proof on `/donations`.

### 2. Charity Campaign Creator Workflow
1. Connect wallet with an account registered as `charity`.
2. Click **Create Charity** in the navigation bar.
3. Fill in name, description, category, target ETH amount, and upload KYC document.
4. Submit the campaign. It will be marked as `Pending` until verified by an Admin.

### 3. Admin Workflow
1. Switch MetaMask to the designated Admin account: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`.
2. Visit `http://localhost:3000/admin`.
3. Under **Pending Verification**, review KYC documents and click **Approve Charity**.
4. The charity will be verified on-chain and become live for donations.

---

## 📄 License
This project is licensed under the MIT License.
