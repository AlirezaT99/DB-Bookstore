CREATE VIEW productFeedbackView AS
    select prName, puName, commentText, rate
    from productFeedback;

CREATE VIEW productAverageRateView AS
	select prName, puName, AVG(rate)
	from productFeedback
    group by prName, puName;

CREATE VIEW episodeAverageRateView AS
	select episodeNumber, cName, AVG(rate)
	from episodeFeedback natural join channel
	group by channelPhoneNumber, cName, episodeNumber;

CREATE VIEW channelAverageRateView AS
	select cName, AVG(rate)
	from episodeFeedback natural join channel
	group by channelPhoneNumber, cName;

CREATE VIEW publisherCashView AS
	select puName, balance
    from publisher;

CREATE VIEW usersCashView AS
	select phoneNumber, uName, balance
    from users;

CREATE VIEW productSellView AS
	select prName, puName, count(*)
    from product natural join userHasProduct
    group by prName, puName;

CREATE VIEW productDiscountGroupView AS
	select discountValue, count(*)
    from product
    group by discountValue;

CREATE VIEW productDiscountPublisherGroupView AS
	select discountValue, puName, count(*)
    from product
    group by discountValue, puName;

CREATE VIEW productWithDiscount AS
    select (1 - discountValue / 100) * price, prName, puName
    from product

