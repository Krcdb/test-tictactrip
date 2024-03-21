# Tictactrip Test

## Project info

This project is a test for an intership at Tictactrip

This is a small API that allow a user to justify a text per line of 80 characters

The email must be unique

There is a limit of 80.000 words per day

The user first need to get an authentication token from the authentication endpoint

# API

The API can be access with this URL : `https://test-tictactrip.onrender.com`

## Get token

This endpoint allows you to retrieve a token which will be used to authorize you when you call the justify endpoint justify

### Request

`POST /api/token`

#### Header
```
Content-Type: application/json
```
#### Body

```json
{
   "email": "your email"
}
```
### Response

#### Body

```json
{
   "token": "your token"
}
```

## Justify text

### Request

`POST /api/justify`

#### Header
```
Content-Type: text/plain
Authorization: Bearer your-token-here
```
#### Body

```
your text
```
### Response

#### Body

```
your text
```