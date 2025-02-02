import requests
import json
import os


def fetch_and_save_transactions(api_url, output_path, chainID):
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()["items"]
        transactions = [item["hash"] for item in data if "hash" in item]
        result = [
            {
                "txs": []
            }
        ]
        for tx in transactions:
            result[0]["txs"].append(tx)

        # Ensure the output directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        # Save results to the file
        with open(output_path, "w") as f:
            json.dump(result, f, indent=2)

        print(f"Results have been saved to {output_path}")

    except requests.RequestException as e:
        print(f"Failed to fetch transactions: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    fetch_and_save_transactions("https://eth.blockscout.com/api/v2/transactions?filter=validated",
                                "tests/data/eth-tx-summary-txs-random-2.json", 1)
