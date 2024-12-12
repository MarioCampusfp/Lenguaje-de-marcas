<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/">
  <html>
		<body>
		<h1>tienda de alimentacion</h1>
		<table border="1">
			<tr>
				<th>nombre</th>
				<th>precio</th>
				<th>descrpcion</th>
        <th>stock</th>
        <th>iva</th>
        <th>precio con iva</th>
			</tr>
			<xsl:for-each select="tienda/producto">
				<tr>
					<td><xsl:value-of select="nombre"/></td>
					<td><xsl:value-of select="pvp"/></td>
					<td><xsl:value-of select="discripcion"/></td>
          <td><xsl:value-of select="stock"/></td>
          <td><xsl:value-of select="iva"/></td>
          <td>precio con iva/></td>
				</tr>
			</xsl:for-each>
		</table>

		</body>
		</html>

  </xsl:template>
</xsl:stylesheet>
