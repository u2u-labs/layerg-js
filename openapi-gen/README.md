openapi-gen
===========

> A util command to generate LayerG server's API client from the Swagger specification.

## Usage

### LayerG

```shell
go run main.go "https://raw.githubusercontent.com/u2u-labs/layerg-core/refs/heads/dev/apigrpc/apigrpc.swagger.json" "LayerG" > ../packages/layerg-js/api.gen.ts
```

### Rationale

The TypeScript generator available with swagger-codegen depends on Node's `"url"` package. The usage in the generated code does not warrant the need for it's inclusion. We wanted to generate lean and simple code output with minimal dependencies so we built our own. This gives us complete control over the dependencies required by the LayerG JS client.

The only dependencies with the generated code is implicit usage of `"fetch"` which can be resolved with a polyfill and `"base64-js"`.

### Limitations

The code generator has __only__ been checked against the Swagger specification generated for LayerG server. YMMV.

https://raw.githubusercontent.com/u2u-labs/layerg-core/refs/heads/dev/apigrpc/apigrpc.swagger.json