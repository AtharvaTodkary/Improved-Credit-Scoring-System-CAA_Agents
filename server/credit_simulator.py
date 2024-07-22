from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


class CreditScoreSimulator:
    def _init_(self, initial_score=650):
        self.credit_score = initial_score

    def apply_payment_history(self, on_time_payments, missed_payments):
        self.credit_score += (on_time_payments * 5) - (missed_payments * 15)

    def apply_credit_utilization(self, current_debt, credit_limit):
        utilization_ratio = current_debt / credit_limit
        if utilization_ratio < 0.3:
            self.credit_score += 20
        elif utilization_ratio < 0.6:
            self.credit_score -= 10
        else:
            self.credit_score -= 30

    def apply_length_of_credit_history(self, account_age_years):
        if account_age_years < 1:
            self.credit_score -= 20
        elif account_age_years < 5:
            self.credit_score += 10
        else:
            self.credit_score += 20

    def apply_new_credit(self, inquiries):
        self.credit_score -= inquiries * 5

    def apply_credit_mix(self, number_of_accounts):
        if number_of_accounts > 5:
            self.credit_score += 10
        elif number_of_accounts < 2:
            self.credit_score -= 10

    def simulate(self, actions):
        for action in actions:
            action_type = action['type']
            params = action['params']
            if action_type == 'payment_history':
                self.apply_payment_history(params['on_time'], params['missed'])
            elif action_type == 'credit_utilization':
                self.apply_credit_utilization(params['debt'], params['limit'])
            elif action_type == 'credit_history_length':
                self.apply_length_of_credit_history(params['age'])
            elif action_type == 'new_credit':
                self.apply_new_credit(params['inquiries'])
            elif action_type == 'credit_mix':
                self.apply_credit_mix(params['accounts'])
        
        return self.credit_score

# @app.route('/simulate', methods=['POST'])
def simulate():
    try:
        data = request.json
        simulator = CreditScoreSimulator()
        final_score = simulator.simulate(data['actions'])
        return jsonify({'final_score': final_score})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# if _name_ == '_main_':
#     app.run(debug=True)